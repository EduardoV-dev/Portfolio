import { type APIRoute } from "astro";

export const prerender = false;

function getProjectIdFromDsn(dsn: string): string {
    const dsnUrl = new URL(dsn);
    const pathnameParts = dsnUrl.pathname.split("/").filter(Boolean);
    return pathnameParts[pathnameParts.length - 1] || "";
}

function getEnvelopeDsn(envelope: string): string | null {
    const firstLine = envelope.split("\n", 1)[0];

    if (!firstLine) {
        return null;
    }

    try {
        const header = JSON.parse(firstLine) as { dsn?: unknown };
        return typeof header.dsn === "string" ? header.dsn : null;
    } catch {
        return null;
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const configuredDsn = import.meta.env.PUBLIC_SENTRY_DSN;

        if (!configuredDsn) {
            return new Response("Sentry DSN not configured", { status: 204 });
        }

        const bodyBuffer = await request.arrayBuffer();
        const bodyText = new TextDecoder().decode(bodyBuffer);
        const envelopeDsn = getEnvelopeDsn(bodyText);

        if (!envelopeDsn) {
            return new Response("Invalid Sentry envelope", { status: 400 });
        }

        const configuredDsnUrl = new URL(configuredDsn);
        const envelopeDsnUrl = new URL(envelopeDsn);
        const configuredProjectId = getProjectIdFromDsn(configuredDsn);
        const envelopeProjectId = getProjectIdFromDsn(envelopeDsn);

        if (
            configuredDsnUrl.hostname !== envelopeDsnUrl.hostname ||
            configuredProjectId !== envelopeProjectId
        ) {
            return new Response("Sentry DSN not allowed", { status: 403 });
        }

        const upstreamUrl = `${configuredDsnUrl.protocol}//${configuredDsnUrl.host}/api/${configuredProjectId}/envelope/`;
        const upstreamResponse = await fetch(upstreamUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-sentry-envelope",
            },
            body: bodyBuffer,
        });

        const responseHeaders = new Headers();
        const upstreamContentType = upstreamResponse.headers.get("content-type");

        if (upstreamContentType) {
            responseHeaders.set("content-type", upstreamContentType);
        }

        const upstreamBody = await upstreamResponse.text();

        return new Response(upstreamBody || null, {
            status: upstreamResponse.status,
            headers: responseHeaders,
        });
    } catch (error) {
        console.error("Sentry tunnel forwarding failed", error);
        return new Response("Sentry tunnel forwarding failed", { status: 500 });
    }
};
