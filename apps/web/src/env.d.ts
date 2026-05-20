/// <reference types="astro/client" />

interface ImportMetaEnv {
    // Build-time / SSR (non-PUBLIC = server-only, available at build time)
    readonly SENTRY_AUTH_TOKEN: string;
    readonly SENTRY_ORG: string;
    readonly SENTRY_PROJECT: string;
    readonly SENTRY_DSN: string;
    readonly SENTRY_RELEASE: string;
    readonly SENTRY_ENVIRONMENT: "development" | "staging" | "production";
    readonly SENTRY_SAMPLE_RATE: string;
    readonly SENTRY_TRACES_SAMPLE_RATE: string;
    readonly SENTRY_PROFILES_SAMPLE_RATE: string;
    readonly SENTRY_DEBUG: string;
    readonly STRAPI_API_TOKEN: string;
    readonly STRAPI_API_URL: string;
    readonly STRAPI_CMS_OPTIONAL: string;
    readonly STRAPI_WEBHOOK_SECRET: string;
    readonly GITHUB_ACTIONS_TOKEN: string;
    readonly GITHUB_REPO_OWNER: string;
    readonly GITHUB_REPO_NAME: string;
    readonly GITHUB_REBUILD_WORKFLOW_FILE: string;
    readonly GITHUB_REBUILD_REF: string;

    // Client-accessible (PUBLIC_ prefix required by Astro)
    readonly PUBLIC_ENVIRONMENT: "development" | "staging" | "production";
    readonly PUBLIC_SITE_URL: string;
    readonly PUBLIC_SENTRY_ENABLED: string;
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
