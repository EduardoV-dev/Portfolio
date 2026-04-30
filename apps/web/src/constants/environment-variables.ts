export const ENVS = Object.freeze({
    SITE_URL: import.meta.env.SITE_URL || "http://localhost:3000",
    PUBLIC_WEB3FORMS_ACCESS_KEY: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    PUBLIC_RECAPTCHA_SITE_KEY: import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || "",
    PUBLIC_STRAPI_API_URL: import.meta.env.PUBLIC_STRAPI_API_URL || "http://localhost:1337/api",
});
