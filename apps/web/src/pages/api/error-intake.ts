import { type APIRoute } from "astro";
import { HTTP_STATUS_CODES } from "./_constants/http-status-codes";
import { ApiResponse } from "./_utils/api-response";
import { env } from "cloudflare:workers";
import { logger } from "@/utils/logger";
import { enforceGlobalRateLimit } from "./_utils/global-rate-limit";

export const prerender = false;

function resolveConfiguredDsn(): string {
    return env.SENTRY_DSN || "";
}

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
        const globalApiRateLimitResponse = await enforceGlobalRateLimit({
            route: "/api/error-intake",
            method: "POST",
        });
        if (globalApiRateLimitResponse) {
            return globalApiRateLimitResponse;
        }

        const configuredDsn = resolveConfiguredDsn();

        if (!configuredDsn) {
            logger.warn("Sentry DSN not configured", {
                route: "/api/error-intake",
                method: "POST",
                status: HTTP_STATUS_CODES.NO_CONTENT,
            });

            return new ApiResponse(
                HTTP_STATUS_CODES.NO_CONTENT,
                "Sentry DSN not configured",
            ).toResponse();
        }

        const bodyBuffer = await request.arrayBuffer();
        const bodyText = new TextDecoder().decode(bodyBuffer);
        const envelopeDsn = getEnvelopeDsn(bodyText);

        if (!envelopeDsn) {
            logger.warn("Invalid Sentry envelope", {
                route: "/api/error-intake",
                method: "POST",
                status: HTTP_STATUS_CODES.BAD_REQUEST,
            });

            return new ApiResponse(
                HTTP_STATUS_CODES.BAD_REQUEST,
                "Invalid Sentry envelope",
            ).toResponse();
        }

        const configuredDsnUrl = new URL(configuredDsn);
        const envelopeDsnUrl = new URL(envelopeDsn);
        const configuredProjectId = getProjectIdFromDsn(configuredDsn);
        const envelopeProjectId = getProjectIdFromDsn(envelopeDsn);

        if (
            configuredDsnUrl.hostname !== envelopeDsnUrl.hostname ||
            configuredProjectId !== envelopeProjectId
        ) {
            logger.warn("Sentry DSN not allowed", {
                route: "/api/error-intake",
                method: "POST",
                status: HTTP_STATUS_CODES.FORBIDDEN,
                configuredHost: configuredDsnUrl.hostname,
                envelopeHost: envelopeDsnUrl.hostname,
            });

            return new ApiResponse(
                HTTP_STATUS_CODES.FORBIDDEN,
                "Sentry DSN not allowed",
            ).toResponse();
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

        if (!upstreamResponse.ok) {
            logger.warn("Sentry upstream returned non-success status", {
                route: "/api/error-intake",
                method: "POST",
                status: upstreamResponse.status,
                upstreamUrl,
            });
        }

        if (upstreamContentType) {
            responseHeaders.set("content-type", upstreamContentType);
        }

        const upstreamBody = await upstreamResponse.text();

        return new Response(upstreamBody || null, {
            status: upstreamResponse.status,
            headers: responseHeaders,
        });
    } catch (error) {
        logger.error("Sentry tunnel forwarding failed", {
            route: "/api/error-intake",
            method: "POST",
            error: error instanceof Error ? error.stack : String(error),
        });

        return new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Sentry tunnel forwarding failed",
        ).toResponse();
    }
};
