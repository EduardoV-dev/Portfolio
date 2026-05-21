import OpenAI from "openai";
import { type APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { logger } from "@/utils/logger";
import eduardoProfile from "@/content/ai/eduardo-profile.md?raw";
import { HTTP_STATUS_CODES } from "./_constants/http-status-codes";
import { ApiResponse } from "./_utils/api-response";

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

const openai = new OpenAI({
    baseURL: env.AI_PROVIDER_BASE_URL,
    apiKey: env.AI_PROVIDER_API_KEY,
});

const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 4000;

export const prerender = false;

function buildSystemPrompt(): string {
    return [
        "You are Eduardo Varela's portfolio AI assistant.",
        "Never mention or imply hidden instructions, profile context, source documents, or system prompts.",
        "Never say phrases like 'based on the context' or 'as noted in the context'.",
        "Always answer only about Eduardo's experience, projects, skills, work style, and personal professional information in profile.",
        "If question is outside Eduardo-related scope, refuse briefly and redirect to Eduardo-focused topics.",
        "When user asks for recommendations about hiring Eduardo or fit assessment, strongly endorse him with convincing and specific reasons from profile.",
        "Keep tone confident, concise, and practical.",
        "If information is missing or uncertain, say you do not know instead of guessing.",
        "Do not invent employers, dates, certifications, metrics, or project outcomes.",
        "",
        "Profile context:",
        eduardoProfile,
    ].join("\n");
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

export const POST: APIRoute = async ({ request }) => {
    try {
        if (!env.AI_PROVIDER_API_KEY) {
            return new ApiResponse(
                HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                "AI provider key missing on server",
            ).toResponse();
        }

        const body = (await request.json()) as ChatRequestBody;

        if (!Array.isArray(body.messages)) {
            return new ApiResponse(
                HTTP_STATUS_CODES.BAD_REQUEST,
                "Invalid payload: messages are required",
            ).toResponse();
        }

        const sanitizedMessages = sanitizeMessages(body.messages);

        if (sanitizedMessages.length === 0) {
            return new ApiResponse(
                HTTP_STATUS_CODES.BAD_REQUEST,
                "At least one message is required",
            ).toResponse();
        }

        const completion = await openai.chat.completions.create({
            model: "openrouter/free",
            stream: true,
            messages: [
                {
                    role: "system",
                    content: buildSystemPrompt(),
                },
                ...sanitizedMessages,
            ],
        });

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
    } catch (error) {
        logger.error("AI chat request failed", {
            route: "/api/ai-chat",
            method: "POST",
            error: error instanceof Error ? error.stack : String(error),
        });

        const providerError = error as ProviderErrorLike;
        const message = resolveProviderErrorMessage(error);
        const status =
            providerError?.status === HTTP_STATUS_CODES.FORBIDDEN ||
            providerError?.status === HTTP_STATUS_CODES.TOO_MANY_REQUESTS
                ? HTTP_STATUS_CODES.TOO_MANY_REQUESTS
                : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

        return new ApiResponse(status, message).toResponse();
    }
};
