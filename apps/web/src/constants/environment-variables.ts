export const ENVS = Object.freeze({
    SITE_URL: import.meta.env.SITE_URL || "http://localhost:3000",
    SENTRY_AUTH_TOKEN: import.meta.env.SENTRY_AUTH_TOKEN || "",
    SENTRY_ORG: import.meta.env.SENTRY_ORG || "eduardo-varela",
    SENTRY_PROJECT: import.meta.env.SENTRY_PROJECT || "portfolio",
    PUBLIC_SENTRY_ENABLED: import.meta.env.PUBLIC_SENTRY_ENABLED || "false",
    PUBLIC_SENTRY_DSN: import.meta.env.PUBLIC_SENTRY_DSN || "",
    PUBLIC_GA_MEASUREMENT_ID: import.meta.env.PUBLIC_GA_MEASUREMENT_ID || "",
    PUBLIC_WEB3FORMS_ACCESS_KEY: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    STRAPI_API_URL: import.meta.env.STRAPI_API_URL || "http://localhost:1337/api",
    STRAPI_API_TOKEN: import.meta.env.STRAPI_API_TOKEN || "",
    STRAPI_CMS_OPTIONAL: import.meta.env.STRAPI_CMS_OPTIONAL === "true",
});
