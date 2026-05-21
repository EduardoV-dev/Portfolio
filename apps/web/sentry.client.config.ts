import * as Sentry from "@sentry/astro";

const sentryTunnelPath = "/api/error-intake";

if (import.meta.env.PUBLIC_SENTRY_ENABLED === "true" && import.meta.env.PUBLIC_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.PUBLIC_SENTRY_DSN,
        environment: import.meta.env.SENTRY_ENVIRONMENT || import.meta.env.PUBLIC_ENVIRONMENT,
        tunnel: sentryTunnelPath,
        sendDefaultPii: true,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
            Sentry.consoleLoggingIntegration({ levels: ["info", "warn", "error"] }),
        ],
        tracesSampleRate: 0.2,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        enableLogs: true,
    });
}
