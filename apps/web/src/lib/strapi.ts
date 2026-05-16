import { ENVS } from "@/constants/environment-variables";
import { strapi } from "@strapi/client";

export const strapiClient = strapi({
    baseURL: ENVS.STRAPI_API_URL,
    ...(ENVS.STRAPI_API_TOKEN ? { auth: ENVS.STRAPI_API_TOKEN } : {}),
});

export function resolveStrapiMediaUrl(url: string): string {
    const trimmedUrl = url.trim();

    if (trimmedUrl.length === 0) {
        return "";
    }

    try {
        return new URL(trimmedUrl, ENVS.STRAPI_API_URL).toString();
    } catch {
        return trimmedUrl;
    }
}
