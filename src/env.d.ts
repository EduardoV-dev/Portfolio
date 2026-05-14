/// <reference types="astro/client" />

interface ImportMetaEnv {
    // Build-time / SSR (non-PUBLIC = server-only, available at build time)
    readonly SITE_URL: string;
    readonly SENTRY_AUTH_TOKEN: string;
    readonly SENTRY_ORG: string;
    readonly SENTRY_PROJECT: string;
    readonly STRAPI_API_TOKEN: string;
    readonly STRAPI_API_URL: string;
    readonly STRAPI_CMS_OPTIONAL: string;

    // Client-accessible (PUBLIC_ prefix required by Astro)
    readonly PUBLIC_SENTRY_ENABLED: string;
    readonly PUBLIC_SENTRY_DSN: string;
    readonly PUBLIC_GA_MEASUREMENT_ID: string;
    readonly PUBLIC_WEB3FORMS_ACCESS_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface StrapiEntity {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
