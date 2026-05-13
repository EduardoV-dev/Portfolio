import { strapiClient } from "@/lib/strapi";
import { type ProjectCategory } from "@/types/strapi";

const projectCategories = strapiClient.collection("project-categories");

/**
 * Fetches all project categories from Strapi API.
 * @returns A promise that resolves to an array of ProjectCategory objects.
 */
const findAll = async () =>
    (
        await projectCategories.find({
            fields: ["name"],
        })
    ).data as ProjectCategory[];

/**
 * An object that contains all services related to project categories.
 */
export const projectCategoryServices = {
    findAll,
};
