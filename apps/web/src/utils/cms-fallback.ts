import { ENVS } from "@/constants/environment-variables";

export function isStrapiCmsOptional() {
    return ENVS.STRAPI_CMS_OPTIONAL || process.env.STRAPI_CMS_OPTIONAL === "true";
}

export function resolveCmsService<TService>(
    service: TService,
    fallbackService: TService,
): TService {
    return isStrapiCmsOptional() ? fallbackService : service;
}
