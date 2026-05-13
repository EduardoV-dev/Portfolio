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
            org: "eduardo-varela",
            project: "portfolio",
            authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
    ],
    site: process.env.SITE_URL,
    build: {
        format: "directory",
    },
});
