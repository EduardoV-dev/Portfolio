import * as Sentry from "@sentry/astro";

if (import.meta.env.PUBLIC_SENTRY_ENABLED === "true" && import.meta.env.PUBLIC_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.PUBLIC_SENTRY_DSN,
        sendDefaultPii: true,
        tracesSampleRate: 0.2,
        enableLogs: true,
    });
}
