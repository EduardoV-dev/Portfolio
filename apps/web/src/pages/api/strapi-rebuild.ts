import { HTTP_STATUS_CODES } from "@/server-src/constants/http-status-codes";
import { ApiResponse } from "@/server-src/utils/api-response";
import axios from "axios";
import { type APIRoute } from "astro";

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
    const webhookSecret = import.meta.env.STRAPI_WEBHOOK_SECRET;
    const githubToken = import.meta.env.GITHUB_ACTIONS_TOKEN;
    const githubOwner = import.meta.env.GITHUB_REPO_OWNER;
    const githubRepo = import.meta.env.GITHUB_REPO_NAME;
    const githubWorkflowFile = import.meta.env.GITHUB_REBUILD_WORKFLOW_FILE || "deploy-staging.yml";
    const githubWorkflowRef = import.meta.env.GITHUB_REBUILD_REF || "staging";

    if (!webhookSecret || !githubToken || !githubOwner || !githubRepo) {
        return new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Missing webhook dispatch configuration",
            {
                webhookSecret: Boolean(webhookSecret),
                githubToken: Boolean(githubToken),
                githubOwner: Boolean(githubOwner),
                githubRepo: Boolean(githubRepo),
            },
        ).toResponse();
    }

    const receivedToken = getBearerToken(request.headers.get("authorization"));

    if (!receivedToken || receivedToken !== webhookSecret) {
        return new ApiResponse(HTTP_STATUS_CODES.UNAUTHORIZED, "Unauthorized").toResponse();
    }

    const headerEvent = request.headers.get("x-strapi-event");

    if (!headerEvent) {
        return new ApiResponse(HTTP_STATUS_CODES.BAD_REQUEST, "Missing x-strapi-event header", {
            allowedEvents: ALLOWED_EVENTS,
        }).toResponse();
    }

    const eventName = headerEvent;

    if (!eventName || !isAllowedEvent(eventName)) {
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

            console.error("Failed to dispatch GitHub workflow", {
                status,
                body,
                eventName,
                message: error.message,
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

        console.error("Unexpected error dispatching GitHub workflow", {
            error,
            eventName,
        });

        return new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Unexpected error triggering rebuild workflow",
        ).toResponse();
    }

    return new ApiResponse(HTTP_STATUS_CODES.ACCEPTED, "Rebuild workflow triggered successfully", {
        event: eventName,
        workflow: githubWorkflowFile,
        ref: githubWorkflowRef,
    }).toResponse();
};
