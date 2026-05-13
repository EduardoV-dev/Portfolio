import { strapiClient } from "@/lib/strapi";
import { resolveCmsService } from "@/utils/cms-fallback";
import { type Project } from "@/types/strapi";

interface ProjectServices {
    findOnlyTwo: () => Promise<Project[]>;
    findAll: () => Promise<Project[]>;
    findAllSlugsOnly: () => Promise<string[]>;
    findBySlug: (slug: string) => Promise<Project | undefined>;
}

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
            highlights: {
                populate: "*",
            },
            metrics: {
                populate: "*",
            },
            skills: {
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
const findOnlyTwo = async () => {
    return (
        await projects.find({
            pagination: { limit: 2 },
            populate: findAllPopulate,
        })
    ).data as Project[];
};

/**
 * Fetches all projects from the Strapi API, this is used in the case studies page.
 * @returns A promise that resolves to an array of Project objects.
 */
const findAll = async () => {
    return (
        await projects.find({
            populate: findAllPopulate,
        })
    ).data as Project[];
};

/**
 * Fetches only the slugs of all projects from the Strapi API.
 * @returns A promise that resolves to an array of project slugs.
 */
const findAllSlugsOnly = async () => {
    const allProjects = (
        await projects.find({
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

const projectServicesDefault: ProjectServices = {
    findOnlyTwo,
    findAll,
    findAllSlugsOnly,
    findBySlug,
};

const projectServicesFallback: ProjectServices = {
    findOnlyTwo: async () => [],
    findAll: async () => [],
    findAllSlugsOnly: async () => [],
    findBySlug: async () => undefined,
};

/**
 * An object that contains all the services related to projects, such as fetching projects from the Strapi API.
 */
export const projectServices = resolveCmsService(projectServicesDefault, projectServicesFallback);
