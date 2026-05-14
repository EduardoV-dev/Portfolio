import * as Sentry from "@sentry/astro";

const sentryTunnelPath = "/tunnel";

function getAbsoluteTunnelUrl(): string {
    const siteUrl = import.meta.env.SITE_URL;
    const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
    return `${normalizedSiteUrl}${sentryTunnelPath}`;
}

if (import.meta.env.PUBLIC_SENTRY_ENABLED === "true" && import.meta.env.PUBLIC_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.PUBLIC_SENTRY_DSN,
        tunnel: getAbsoluteTunnelUrl(),
        sendDefaultPii: true,
        tracesSampleRate: 0.2,
    });
}
