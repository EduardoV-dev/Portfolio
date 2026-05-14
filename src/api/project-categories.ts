import { strapiClient } from "@/lib/strapi";
import { resolveCmsService } from "@/utils/cms-fallback";
import { type ProjectCategory } from "@/types/strapi";

const projectCategories = strapiClient.collection("project-categories");

interface ProjectCategoryServices {
    findAll: () => Promise<ProjectCategory[]>;
}

/**
 * Fetches all project categories from Strapi API.
 * @returns A promise that resolves to an array of ProjectCategory objects.
 */
const findAll = async () => {
    return (
        await projectCategories.find({
            fields: ["name"],
        })
    ).data as ProjectCategory[];
};

const projectCategoryServicesDefault: ProjectCategoryServices = {
    findAll,
};

const projectCategoryServicesFallback: ProjectCategoryServices = {
    findAll: async () => [],
};

/**
 * An object that contains all services related to project categories.
 */
export const projectCategoryServices = resolveCmsService(
    projectCategoryServicesDefault,
    projectCategoryServicesFallback,
);
