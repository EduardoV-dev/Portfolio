import * as Sentry from "@sentry/astro";

function parseBoolean(value: string | undefined, fallback = false): boolean {
    if (value == null) {
        return fallback;
    }

    return value === "true";
}

function parseRate(value: string | undefined, fallback: number): number {
    if (value == null || value.trim() === "") {
        return fallback;
    }

    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
        return fallback;
    }

    return Math.min(Math.max(parsedValue, 0), 1);
}

const isSentryEnabled = import.meta.env.PUBLIC_SENTRY_ENABLED === "true";
const dsn = import.meta.env.SENTRY_DSN;

if (isSentryEnabled && dsn) {
    Sentry.init({
        dsn,
        release: import.meta.env.SENTRY_RELEASE || undefined,
        environment: import.meta.env.SENTRY_ENVIRONMENT || import.meta.env.PUBLIC_ENVIRONMENT,
        sampleRate: parseRate(import.meta.env.SENTRY_SAMPLE_RATE, 1.0),
        tracesSampleRate: parseRate(import.meta.env.SENTRY_TRACES_SAMPLE_RATE, 0.2),
        profilesSampleRate: parseRate(import.meta.env.SENTRY_PROFILES_SAMPLE_RATE, 0.0),
        debug: parseBoolean(import.meta.env.SENTRY_DEBUG, false),
        sendDefaultPii: true,
        enableLogs: true,
    });
}
