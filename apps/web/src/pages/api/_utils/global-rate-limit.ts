import { env } from "cloudflare:workers";
import { logger } from "@/utils/logger";
import { HTTP_STATUS_CODES } from "../_constants/http-status-codes";
import { ApiResponse } from "./api-response";

const RATE_LIMIT_PERIOD_SECONDS = 60;
const GLOBAL_RATE_LIMIT_KEY = "api:global";
const IS_DEVELOPMENT = env.PUBLIC_ENVIRONMENT === "development";

interface GlobalRateLimitContext {
    route: string;
    method: string;
}

export async function enforceGlobalRateLimit(
    context: GlobalRateLimitContext,
): Promise<Response | undefined> {
    const rateLimiter = env.GLOBAL_RATE_LIMITER;

    if (!rateLimiter && !IS_DEVELOPMENT) {
        logger.error("Global rate limiter binding missing", {
            route: context.route,
            method: context.method,
        });

        return new ApiResponse(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Global rate limiter not configured on server",
        ).toResponse();
    }

    if (!rateLimiter) {
        logger.warn("Global rate limiter disabled in development", {
            route: context.route,
            method: context.method,
        });
        return;
    }

    const globalLimitResult = await rateLimiter.limit({ key: GLOBAL_RATE_LIMIT_KEY });

    if (!globalLimitResult.success) {
        logger.warn("Global rate limit exceeded", {
            route: context.route,
            method: context.method,
            key: GLOBAL_RATE_LIMIT_KEY,
            status: HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
        });

        return new ApiResponse(
            HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
            "Service is busy right now. Please try again in a minute.",
        )
            .setHeaders({ "Retry-After": String(RATE_LIMIT_PERIOD_SECONDS) })
            .toResponse();
    }
}
