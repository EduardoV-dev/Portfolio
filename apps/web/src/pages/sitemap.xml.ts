import { ENVS } from "@/constants/environment-variables";
import { APP_ROUTES } from "@/constants/routes";
import { projectServices } from "@/api/projects";

export const prerender = true;

const STATIC_ROUTES = [
    APP_ROUTES.HOME,
    APP_ROUTES.CASE_STUDIES.ROOT,
    APP_ROUTES.ARCHITECTURE,
    APP_ROUTES.ABOUT,
    APP_ROUTES.BLOG.ROOT,
    APP_ROUTES.CONTACT,
    APP_ROUTES.PRIVACY_POLICY,
    APP_ROUTES.TERMS_OF_USE,
];

function createUrl(location: string): string {
    const baseUrl = ENVS.PUBLIC_SITE_URL.replace(/\/$/, "");
    return `${baseUrl}${location === "/" ? "" : location}`;
}

interface UrlEntryOptions {
    location: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: string;
    lastModified: string;
}

function createUrlEntry({
    location,
    changeFrequency,
    priority,
    lastModified,
}: UrlEntryOptions): string {
    return `<url><loc>${createUrl(location)}</loc><lastmod>${lastModified}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority}</priority></url>`;
}

export async function GET() {
    const projectSlugs = await projectServices.findAllSlugsOnly();
    const caseStudyRoutes = projectSlugs.map((slug) => APP_ROUTES.CASE_STUDIES.DETAIL(slug));
    const now = new Date().toISOString();

    const staticEntries = STATIC_ROUTES.map((location) =>
        createUrlEntry({
            location,
            changeFrequency: location === APP_ROUTES.HOME ? "weekly" : "monthly",
            priority: location === APP_ROUTES.HOME ? "1.0" : "0.8",
            lastModified: now,
        }),
    );

    const caseStudyEntries = caseStudyRoutes.map((location) =>
        createUrlEntry({
            location,
            changeFrequency: "monthly",
            priority: "0.7",
            lastModified: now,
        }),
    );

    const urls = [...staticEntries, ...caseStudyEntries].join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
