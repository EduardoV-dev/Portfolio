// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: cloudflare({
        prerenderEnvironment: "node",
    }),
    integrations: [react()],
    site: process.env.PUBLIC_SITE_URL,
    build: {
        format: "directory",
    },
});
