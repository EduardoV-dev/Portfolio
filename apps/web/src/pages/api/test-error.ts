import * as Sentry from "@sentry/astro";
import { logger } from "@/utils/logger";
import { HTTP_STATUS_CODES } from "./_constants/http-status-codes";

export const prerender = false;

export async function GET() {
    try {
        logger.error("Sentry test endpoint log", {
            route: "/api/test-error",
            method: "GET",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        });

        throw new Error("Sentry Example API Route Error");
    } catch {
        await Sentry.flush(2000);

        return new Response("Sentry test endpoint log", {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
    }
}
