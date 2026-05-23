import { ENVS } from "@/constants/environment-variables";
import { resolveCmsService } from "@/utils/cms-fallback";

interface MyProfileServices {
    findSystemPrompt: () => Promise<string>;
}

interface MyProfileResponse {
    data?: {
        systemPrompt?: string;
    };
}

function buildMyProfileUrl(): string {
    const baseUrl = ENVS.STRAPI_API_URL.replace(/\/$/, "");
    return `${baseUrl}/my-profile?fields[0]=systemPrompt`;
}

const findSystemPrompt = async () => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (ENVS.STRAPI_API_TOKEN) {
        headers.Authorization = `Bearer ${ENVS.STRAPI_API_TOKEN}`;
    }

    const response = await fetch(buildMyProfileUrl(), {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch my-profile from Strapi: ${response.status}`);
    }

    const result = (await response.json()) as MyProfileResponse;
    return result.data?.systemPrompt?.trim() ?? "";
};

const myProfileServicesDefault: MyProfileServices = {
    findSystemPrompt,
};

const myProfileServicesFallback: MyProfileServices = {
    findSystemPrompt: async () => "",
};

export const myProfileServices = resolveCmsService(
    myProfileServicesDefault,
    myProfileServicesFallback,
);
