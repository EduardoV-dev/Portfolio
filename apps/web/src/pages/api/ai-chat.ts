import OpenAI from "openai";
import { type APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { logger } from "@/utils/logger";
import { HTTP_STATUS_CODES } from "./_constants/http-status-codes";
import { ApiResponse } from "./_utils/api-response";
import { enforceGlobalRateLimit } from "./_utils/global-rate-limit";

interface ChatRequestMessage {
    role: "assistant" | "user";
    content: string;
}

interface ChatRequestBody {
    messages?: ChatRequestMessage[];
}

interface ProviderErrorLike {
    status?: number;
    message?: string;
}

interface RequestContext {
    request: Request;
    messages: ChatRequestMessage[];
    systemPrompt: string;
}

const openai = new OpenAI({
    baseURL: env.AI_PROVIDER_BASE_URL,
    apiKey: env.AI_PROVIDER_API_KEY,
});

const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 4000;
const RATE_LIMIT_PERIOD_SECONDS = 60;
const EDUARDO_PROFILE_ROUTE = "/eduardo-profile.md";
const IS_DEVELOPMENT = env.PUBLIC_ENVIRONMENT === "development";

export const prerender = false;

async function loadEduardoProfileMarkdown(request: Request): Promise<string> {
    const profileRequest = new Request(new URL(EDUARDO_PROFILE_ROUTE, request.url));
    const profileResponse = await env.ASSETS.fetch(profileRequest);

    if (!profileResponse.ok) {
        logger.error("Failed to load profile markdown from assets", {
            route: "/api/ai-chat",
            method: "POST",
        });

        throw new Error(
            `Failed to load ${EDUARDO_PROFILE_ROUTE} from assets: ${profileResponse.status}`,
        );
    }

    return (await profileResponse.text()).trim();
}

function createErrorResponse(status: number, message: string): Response {
    return new ApiResponse(status, message).toResponse();
}

function createTooManyRequestsResponse(message: string): Response {
    return new ApiResponse(HTTP_STATUS_CODES.TOO_MANY_REQUESTS, message)
        .setHeaders({ "Retry-After": String(RATE_LIMIT_PERIOD_SECONDS) })
        .toResponse();
}

function sanitizeMessages(messages: ChatRequestMessage[]): ChatRequestMessage[] {
    return messages
        .filter((message) => message.role === "assistant" || message.role === "user")
        .map((message) => ({
            role: message.role,
            content: message.content.trim().slice(0, MAX_CONTENT_LENGTH),
        }))
        .filter((message) => message.content.length > 0)
        .slice(-MAX_MESSAGES);
}

function resolveProviderErrorMessage(error: unknown): string {
    const providerError = error as ProviderErrorLike;

    if (providerError?.status === HTTP_STATUS_CODES.FORBIDDEN) {
        if (providerError.message?.toLowerCase().includes("limit exceeded")) {
            return "AI provider quota exceeded. Please try again later.";
        }

        return "AI provider rejected request. Please try again later.";
    }

    if (providerError?.status === 429) {
        return "AI provider rate limit reached. Please retry in a moment.";
    }

    return "Failed to generate response";
}

function getClientIp(request: Request): string {
    return request.headers.get("cf-connecting-ip") ?? "unknown";
}

function validateProviderConfig(): Response | undefined {
    if (!env.AI_PROVIDER_API_KEY) {
        logger.error("AI provider key missing", {
            route: "/api/ai-chat",
            method: "POST",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        });

        return createErrorResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "AI provider key missing on server",
        );
    }
}

async function parseAndSanitizeMessages(
    request: Request,
): Promise<ChatRequestMessage[] | Response> {
    const body = (await request.json()) as ChatRequestBody;

    if (!Array.isArray(body.messages)) {
        logger.warn("Invalid AI chat payload: messages missing", {
            route: "/api/ai-chat",
            method: "POST",
            status: HTTP_STATUS_CODES.BAD_REQUEST,
        });

        return createErrorResponse(
            HTTP_STATUS_CODES.BAD_REQUEST,
            "Invalid payload: messages are required",
        );
    }

    const sanitizedMessages = sanitizeMessages(body.messages);

    if (sanitizedMessages.length === 0) {
        logger.warn("Invalid AI chat payload: empty messages", {
            route: "/api/ai-chat",
            method: "POST",
            status: HTTP_STATUS_CODES.BAD_REQUEST,
        });

        return createErrorResponse(
            HTTP_STATUS_CODES.BAD_REQUEST,
            "At least one message is required",
        );
    }

    return sanitizedMessages;
}

async function enforceRateLimits(request: Request): Promise<Response | undefined> {
    const rateLimiter = env.AI_CHAT_RATE_LIMITER;
    const globalRateLimiter = env.AI_CHAT_GLOBAL_RATE_LIMITER;
    const hasRateLimiters = Boolean(rateLimiter && globalRateLimiter);

    const globalApiRateLimitResponse = await enforceGlobalRateLimit({
        route: "/api/ai-chat",
        method: "POST",
    });
    if (globalApiRateLimitResponse) {
        return globalApiRateLimitResponse;
    }

    if (!hasRateLimiters && !IS_DEVELOPMENT) {
        logger.error("AI chat rate limiter binding missing", {
            route: "/api/ai-chat",
            method: "POST",
        });

        return createErrorResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Rate limiter not configured on server",
        );
    }

    if (!hasRateLimiters) {
        logger.warn("AI chat rate limiter disabled in development", {
            route: "/api/ai-chat",
            method: "POST",
        });
        return;
    }

    const globalLimitResult = await globalRateLimiter!.limit({ key: "ai-chat:global" });
    if (!globalLimitResult.success) {
        logger.warn("AI chat global rate limit exceeded", {
            route: "/api/ai-chat",
            method: "POST",
            key: "ai-chat:global",
            status: HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
        });

        return createTooManyRequestsResponse(
            "Service is busy right now. Please try again in a minute.",
        );
    }

    const clientIp = getClientIp(request);
    const { success } = await rateLimiter!.limit({ key: `ai-chat:${clientIp}` });

    if (!success) {
        logger.warn("AI chat per-IP rate limit exceeded", {
            route: "/api/ai-chat",
            method: "POST",
            key: `ai-chat:${clientIp}`,
            status: HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
        });

        return createTooManyRequestsResponse("Rate limit exceeded. Please try again in a minute.");
    }
}

async function resolveSystemPrompt(request: Request): Promise<string | Response> {
    const systemPrompt = await loadEduardoProfileMarkdown(request);

    if (!systemPrompt) {
        logger.error("AI chat system prompt unavailable", {
            route: "/api/ai-chat",
            method: "POST",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        });

        return createErrorResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Profile prompt is unavailable. Please try again later.",
        );
    }

    return systemPrompt;
}

async function buildRequestContext(request: Request): Promise<RequestContext | Response> {
    const parsedMessages = await parseAndSanitizeMessages(request);
    if (parsedMessages instanceof Response) {
        return parsedMessages;
    }

    const systemPrompt = await resolveSystemPrompt(request);
    if (systemPrompt instanceof Response) {
        return systemPrompt;
    }

    return {
        request,
        messages: parsedMessages,
        systemPrompt,
    };
}

async function createChatCompletion(context: RequestContext) {
    return openai.chat.completions.create({
        model: "openrouter/free",
        stream: true,
        messages: [
            {
                role: "system",
                content: context.systemPrompt,
            },
            ...context.messages,
        ],
    });
}

function createStreamingResponse(
    completion: Awaited<ReturnType<typeof createChatCompletion>>,
): Response {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            try {
                for await (const chunk of completion) {
                    const delta = chunk.choices[0]?.delta?.content;
                    if (!delta) {
                        continue;
                    }

                    controller.enqueue(encoder.encode(delta));
                }

                controller.close();
            } catch (error) {
                logger.error("AI chat stream response failed", {
                    route: "/api/ai-chat",
                    method: "POST",
                    error: error instanceof Error ? error.stack : String(error),
                });
                controller.error(error);
            }
        },
    });

    return new Response(stream, {
        status: HTTP_STATUS_CODES.OK,
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}

function resolveProviderErrorStatus(error: unknown): number {
    const providerError = error as ProviderErrorLike;

    if (
        providerError?.status === HTTP_STATUS_CODES.FORBIDDEN ||
        providerError?.status === HTTP_STATUS_CODES.TOO_MANY_REQUESTS
    ) {
        return HTTP_STATUS_CODES.TOO_MANY_REQUESTS;
    }

    return HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const providerConfigErrorResponse = validateProviderConfig();
        if (providerConfigErrorResponse) {
            return providerConfigErrorResponse;
        }

        const rateLimitErrorResponse = await enforceRateLimits(request);
        if (rateLimitErrorResponse) {
            return rateLimitErrorResponse;
        }

        const requestContext = await buildRequestContext(request);
        if (requestContext instanceof Response) {
            return requestContext;
        }

        const completion = await createChatCompletion(requestContext);
        return createStreamingResponse(completion);
    } catch (error) {
        logger.error("AI chat request failed", {
            route: "/api/ai-chat",
            method: "POST",
            error: error instanceof Error ? error.stack : String(error),
        });

        const message = resolveProviderErrorMessage(error);
        const status = resolveProviderErrorStatus(error);

        return new ApiResponse(status, message).toResponse();
    }
};
