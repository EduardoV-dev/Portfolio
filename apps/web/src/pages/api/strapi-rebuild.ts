import { HTTP_STATUS_CODES } from "./_constants/http-status-codes";
import { ApiResponse } from "./_utils/api-response";
import axios from "axios";
import { env } from "cloudflare:workers";
import { type APIRoute } from "astro";
import { logger } from "@/utils/logger";
import { enforceGlobalRateLimit } from "./_utils/global-rate-limit";

export const prerender = false;

type StrapiWebhookEvent = "entry.publish" | "entry.unpublish";

const ALLOWED_EVENTS: readonly StrapiWebhookEvent[] = ["entry.publish", "entry.unpublish"];

function getBearerToken(headerValue: string | null): string {
    if (!headerValue) {
        return "";
    }

    const [scheme, token] = headerValue.split(" ", 2);

    if (scheme?.toLowerCase() !== "bearer" || !token) {
        return "";
    }

    return token.trim();
}

function isAllowedEvent(eventName: string): eventName is StrapiWebhookEvent {
    return ALLOWED_EVENTS.includes(eventName as StrapiWebhookEvent);
}

export const POST: APIRoute = async ({ request }) => {
    const globalApiRateLimitResponse = await enforceGlobalRateLimit({
        route: "/api/strapi-rebuild",
        method: "POST",
    });
    if (globalApiRateLimitResponse) {
        return globalApiRateLimitResponse;
    }

    const webhookSecret = env.STRAPI_WEBHOOK_SECRET;
    const githubToken = env.GITHUB_ACTIONS_TOKEN;
    const githubOwner = env.GITHUB_REPO_OWNER;
    const githubRepo = env.GITHUB_REPO_NAME;
    const githubWorkflowFile = env.GITHUB_REBUILD_WORKFLOW_FILE;
    const githubWorkflowRef = env.GITHUB_REBUILD_REF;

    if (
        !webhookSecret ||
        !githubToken ||
        !githubOwner ||
        !githubRepo ||
        !githubWorkflowFile ||
        !githubWorkflowRef
    ) {
        logger.error("Missing webhook dispatch configuration", {
            route: "/api/strapi-rebuild",
            method: "POST",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            webhookSecret: Boolean(webhookSecret),
            githubToken: Boolean(githubToken),
            githubOwner: Boolean(githubOwner),
            githubRepo: Boolean(githubRepo),
            githubWorkflowFile: Boolean(githubWorkflowFile),
            githubWorkflowRef: Boolean(githubWorkflowRef),
        });

        return new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Missing webhook dispatch configuration",
            {
                webhookSecret: Boolean(webhookSecret),
                githubToken: Boolean(githubToken),
                githubOwner: Boolean(githubOwner),
                githubRepo: Boolean(githubRepo),
                githubWorkflowFile: Boolean(githubWorkflowFile),
                githubWorkflowRef: Boolean(githubWorkflowRef),
            },
        ).toResponse();
    }

    const receivedToken = getBearerToken(request.headers.get("authorization"));

    if (!receivedToken || receivedToken !== webhookSecret) {
        logger.warn("Unauthorized Strapi rebuild request", {
            route: "/api/strapi-rebuild",
            method: "POST",
            status: HTTP_STATUS_CODES.UNAUTHORIZED,
        });

        return new ApiResponse(HTTP_STATUS_CODES.UNAUTHORIZED, "Unauthorized").toResponse();
    }

    const headerEvent = request.headers.get("x-strapi-event");

    if (!headerEvent) {
        logger.warn("Missing x-strapi-event header", {
            route: "/api/strapi-rebuild",
            method: "POST",
            status: HTTP_STATUS_CODES.BAD_REQUEST,
        });

        return new ApiResponse(HTTP_STATUS_CODES.BAD_REQUEST, "Missing x-strapi-event header", {
            allowedEvents: ALLOWED_EVENTS,
        }).toResponse();
    }

    const eventName = headerEvent;

    if (!eventName || !isAllowedEvent(eventName)) {
        logger.warn("Strapi event not allowed", {
            route: "/api/strapi-rebuild",
            method: "POST",
            status: HTTP_STATUS_CODES.NO_CONTENT,
            eventName,
        });

        return new ApiResponse(HTTP_STATUS_CODES.NO_CONTENT, "Event not allowed", {
            allowedEvents: ALLOWED_EVENTS,
        }).toResponse();
    }

    try {
        await axios.post(
            `https://api.github.com/repos/${githubOwner}/${githubRepo}/actions/workflows/${githubWorkflowFile}/dispatches`,
            {
                ref: githubWorkflowRef,
            },
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${githubToken}`,
                    "Content-Type": "application/json",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            },
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const body =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : JSON.stringify(error.response?.data || null);

            logger.error("Failed to dispatch GitHub workflow", {
                status,
                body,
                eventName,
            });

            return new ApiResponse(
                HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                "Failed to trigger rebuild workflow",
                {
                    status,
                    body,
                },
            ).toResponse();
        }

        const message = error instanceof Error ? error.message : "unknown-error";

        logger.error("Failed to dispatch GitHub workflow", {
            message,
            eventName,
        });

        return new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to trigger rebuild workflow",
            { message },
        ).toResponse();
    }

    return new ApiResponse(HTTP_STATUS_CODES.ACCEPTED, "Rebuild workflow triggered successfully", {
        event: eventName,
        workflow: githubWorkflowFile,
        ref: githubWorkflowRef,
    }).toResponse();
};
