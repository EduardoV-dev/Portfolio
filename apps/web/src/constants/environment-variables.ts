export const ENVS = Object.freeze({
    SITE_URL: import.meta.env.SITE_URL || "http://localhost:3000",
    PUBLIC_WEB3FORMS_ACCESS_KEY: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    STRAPI_API_URL: import.meta.env.STRAPI_API_URL || "http://localhost:1337/api",
    STRAPI_API_TOKEN: import.meta.env.STRAPI_API_TOKEN || "",
});
