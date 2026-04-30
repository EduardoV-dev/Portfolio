import { strapiClient } from "@/lib/strapi";
import type { Project } from "@/types/strapi";

const projects = strapiClient.collection("projects");

const findAllPopulate = {
    categories: {
        fields: ["name"],
    },
    images: {
        fields: ["url", "alternativeText"],
    },
    tags: {
        fields: ["name"],
    },
};

const findBySlugPopulate = {
    ...findAllPopulate,
    detail: {
        populate: {
            architecture: {
                populate: {
                    layers: {
                        populate: {
                            components: "*",
                        },
                    },
                },
            },
            highlights: {
                populate: "*",
            },
            metrics: {
                populate: "*",
            },
            technologies: {
                populate: { category: { fields: ["name"] } },
            },
        },
    },
};

/**
 * Fetches only two projects from the Strapi API, these two projects are used in the home page,
 * and they are the most recent ones.
 * @returns A promise that resolves to an array of two Project objects.
 */
const findOnlyTwo = async () =>
    (
        await projects.find({
            pagination: { limit: 2 },
            populate: findAllPopulate,
        })
    ).data as Project[];

/**
 * Fetches all projects from the Strapi API, this is used in the case studies page.
 * @returns A promise that resolves to an array of Project objects.
 */
const findAll = async () =>
    (
        await projects.find({
            pagination: { limit: -1 },
            populate: findAllPopulate,
        })
    ).data as Project[];

/**
 * Fetches only the slugs of all projects from the Strapi API.
 * @returns A promise that resolves to an array of project slugs.
 */
const findAllSlugsOnly = async () => {
    const allProjects = (
        await projects.find({
            pagination: { limit: -1 },
            fields: ["slug"],
        })
    ).data as Project[];

    return allProjects.map((project) => project.slug);
};

/**
 * Fetches a project by its slug from the Strapi API, this is used in the case study detail page.
 * @param slug - The slug of the project to fetch.
 * @returns A promise that resolves to a Project object if found, or undefined if not found.
 */
const findBySlug = async (slug: string) => {
    const result = (await projects.find({ filters: { slug }, populate: findBySlugPopulate }))
        .data as Project[];

    return result.length > 0 ? result[0] : undefined;
};

/**
 * An object that contains all the services related to projects, such as fetching projects from the Strapi API.
 */
export const projectServices = {
    findOnlyTwo,
    findAll,
    findAllSlugsOnly,
    findBySlug,
};
