import { ENVS } from "@/constants/environment-variables";

export function isStrapiCmsOptional() {
    return ENVS.STRAPI_CMS_OPTIONAL || process.env.STRAPI_CMS_OPTIONAL === "true";
}

function isCallable(value: unknown): value is (...args: unknown[]) => unknown {
    return typeof value === "function";
}

export function resolveCmsService<TService>(
    service: TService,
    fallbackService: TService,
): TService {
    if (isStrapiCmsOptional()) {
        return fallbackService;
    }

    return new Proxy(service as object, {
        get(target, property, receiver) {
            const originalMember = Reflect.get(target, property, receiver);
            const fallbackMember = Reflect.get(fallbackService as object, property);

            if (!isCallable(originalMember)) {
                return originalMember;
            }

            return async (...args: unknown[]) => {
                try {
                    return await originalMember(...args);
                } catch {
                    if (isCallable(fallbackMember)) {
                        return await fallbackMember(...args);
                    }

                    throw new Error(`Fallback service member is not callable: ${String(property)}`);
                }
            };
        },
    }) as TService;
}
