import { strapiClient } from "@/lib/strapi";
import type { Project } from "@/types/strapi";

const projects = strapiClient.collection("projects");

const findPopulate = {
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

/**
 * Fetches only two projects from the Strapi API, these two projects are used in the home page,
 * and they are the most recent ones.
 * @returns A promise that resolves to an array of two Project objects.
 */
const findOnlyTwo = async () =>
    (
        await projects.find({
            pagination: { limit: 2 },
            populate: findPopulate,
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
            populate: findPopulate,
        })
    ).data as Project[];

/**
 * An object that contains all the services related to projects, such as fetching projects from the Strapi API.
 */
export const projectServices = {
    findOnlyTwo,
    findAll,
};
