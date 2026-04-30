import { ENVS } from "@/constants/environment-variables";
import { strapi } from "@strapi/client";

export const strapiClient = strapi({
    baseURL: ENVS.PUBLIC_STRAPI_API_URL,
});
