/// <reference types="astro/client" />

interface ImportMetaEnv {
    // Build-time / SSR (non-PUBLIC = server-only, available at build time)
    readonly SITE_URL: string;

    // Client-accessible (PUBLIC_ prefix required by Astro)
    readonly PUBLIC_WEB3FORMS_ACCESS_KEY: string;
    readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
