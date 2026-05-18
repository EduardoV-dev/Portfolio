import * as Sentry from "@sentry/astro";

const isStaging = import.meta.env.PUBLIC_ENVIRONMENT === "staging";

if (import.meta.env.PUBLIC_SENTRY_ENABLED === "true" && import.meta.env.PUBLIC_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.PUBLIC_SENTRY_DSN,
        sendDefaultPii: true,
        tracesSampleRate: 0.2,
        debug: isStaging,
    });
}
