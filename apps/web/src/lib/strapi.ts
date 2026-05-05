import { ENVS } from "@/constants/environment-variables";
import { strapi } from "@strapi/client";

console.log("[strapi] STRAPI_API_URL:", ENVS.STRAPI_API_URL);
console.log("[strapi] STRAPI_API_TOKEN:", ENVS.STRAPI_API_TOKEN ? "set" : "NOT SET");

export const strapiClient = strapi({
    baseURL: ENVS.STRAPI_API_URL,
    ...(ENVS.STRAPI_API_TOKEN ? { auth: ENVS.STRAPI_API_TOKEN } : {}),
});
