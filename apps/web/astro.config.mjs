// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import partytown from "@astrojs/partytown";

const isProduction = process.env.PUBLIC_ENVIRONMENT === "production";
const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: cloudflare({
        prerenderEnvironment: "node",
    }),
    integrations: [
        react(),
        sentry(),
        partytown({ config: { forward: ["dataLayer.push"] } }),
        ...(isProduction
            ? [
                  sitemap({
                      filter: (page) => !page.endsWith("/404/") && !page.endsWith("/500/"),
                  }),
              ]
            : []),
    ],
    site: siteUrl,
    build: {
        format: "directory",
    },
});
