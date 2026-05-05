import { ENVS } from "@/constants/environment-variables";
import { strapi } from "@strapi/client";

export const strapiClient = strapi({
    baseURL: ENVS.STRAPI_API_URL,
    ...(ENVS.STRAPI_API_TOKEN ? { auth: ENVS.STRAPI_API_TOKEN } : {}),
});
