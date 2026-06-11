import { ENVS } from "@/constants/environment-variables";

export const prerender = true;

const isProduction = ENVS.PUBLIC_ENVIRONMENT === "production";
const siteUrl = ENVS.PUBLIC_SITE_URL.replace(/\/$/, "");

const productionRobots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;

const nonProductionRobots = `User-agent: *
Disallow: /
`;

export function GET() {
    return new Response(isProduction ? productionRobots : nonProductionRobots, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
