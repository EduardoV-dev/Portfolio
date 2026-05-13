// @ts-check
import { defineConfig } from "astro/config";
import sentry from "@sentry/astro";

import react from "@astrojs/react";
import awsAmplify from "amplify-astro-adapter";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: awsAmplify(),
    integrations: [
        react(),
        sentry({
            org: process.env.SENTRY_ORG || "eduardo-varela",
            project: process.env.SENTRY_PROJECT || "portfolio",
            authToken: process.env.SENTRY_AUTH_TOKEN,
            sourcemaps: {
                assets: [".amplify-hosting/static/_astro/**/*.js.map"],
            },
        }),
    ],
    site: process.env.SITE_URL,
    build: {
        format: "directory",
    },
});
