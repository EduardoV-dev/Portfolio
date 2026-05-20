import { type APIRoute } from "astro";

export const prerender = false;

type StrapiWebhookEvent = "entry.publish" | "entry.unpublish";

interface StrapiWebhookPayload {
    event?: unknown;
    model?: unknown;
}

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
        return new Response("Missing webhook dispatch configuration", { status: 500 });
    }

    const receivedToken = getBearerToken(request.headers.get("authorization"));

    if (!receivedToken || receivedToken !== webhookSecret) {
        return new Response("Unauthorized", { status: 401 });
    }

    let payload: StrapiWebhookPayload = {};

    try {
        payload = (await request.json()) as StrapiWebhookPayload;
    } catch {
        return new Response("Invalid JSON payload", { status: 400 });
    }

    const headerEvent = request.headers.get("x-strapi-event");
    const payloadEvent = typeof payload.event === "string" ? payload.event : "";
    const eventName = headerEvent || payloadEvent;

    if (!eventName || !isAllowedEvent(eventName)) {
        return new Response(null, { status: 204 });
    }

    const modelName = typeof payload.model === "string" ? payload.model : "";

    const dispatchResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/actions/workflows/${githubWorkflowFile}/dispatches`,
        {
            method: "POST",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${githubToken}`,
                "Content-Type": "application/json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({
                ref: githubWorkflowRef,
            }),
        },
    );

    if (!dispatchResponse.ok) {
        const errorText = await dispatchResponse.text();
        console.error("Failed to dispatch GitHub workflow", {
            status: dispatchResponse.status,
            body: errorText,
            eventName,
            modelName,
        });

        return new Response("Failed to trigger rebuild", { status: 502 });
    }

    return new Response(
        JSON.stringify({
            ok: true,
            event: eventName,
            model: modelName,
            workflow: githubWorkflowFile,
            ref: githubWorkflowRef,
        }),
        {
            status: 202,
            headers: {
                "content-type": "application/json",
            },
        },
    );
};
