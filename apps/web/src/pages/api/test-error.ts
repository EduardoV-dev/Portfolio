import * as Sentry from "@sentry/astro";
import { logger } from "@/utils/logger";
import { HTTP_STATUS_CODES } from "@/server-src/constants/http-status-codes";

export const prerender = false;

export async function GET() {
    try {
        throw new Error("Sentry Example API Route Error");
    } catch (error) {
        logger.error("Sentry Example API Route Error", {
            route: "/api/test-error",
            method: "GET",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        });

        Sentry.captureException(error);
        await Sentry.flush(2000);

        return new Response("Sentry Example API Route Error", {
            status: 500,
        });
    }
}
