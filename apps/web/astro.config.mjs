// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sentry from "@sentry/astro";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: cloudflare({
        prerenderEnvironment: "node",
    }),
    integrations: [
        react(),
        sentry(),
        partytown({ config: { forward: ["dataLayer.push", "gtag"] } }),
    ],
    site: process.env.PUBLIC_SITE_URL,
    build: {
        format: "directory",
    },
});
