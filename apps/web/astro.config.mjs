// @ts-check
import { defineConfig } from "astro/config";
import sentry from "@sentry/astro";
import react from "@astrojs/react";
import awsAmplify from "astro-aws-amplify";

const hasSentryToken = Boolean(process.env.SENTRY_AUTH_TOKEN);
const hasSentryOrg = Boolean(process.env.SENTRY_ORG);
const hasSentryProject = Boolean(process.env.SENTRY_PROJECT);

if (hasSentryToken && (!hasSentryOrg || !hasSentryProject)) {
    throw new Error(
        "SENTRY_AUTH_TOKEN is set, but SENTRY_ORG or SENTRY_PROJECT is missing. " +
            "Set both variables or unset SENTRY_AUTH_TOKEN.",
    );
}

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: awsAmplify({
        customRules: [
            { source: "/about", target: "/about/index.html", status: "200" },
            { source: "/about/", target: "/about/index.html", status: "200" },
            { source: "/architecture", target: "/architecture/index.html", status: "200" },
            { source: "/architecture/", target: "/architecture/index.html", status: "200" },
            { source: "/blog", target: "/blog/index.html", status: "200" },
            { source: "/blog/", target: "/blog/index.html", status: "200" },
            { source: "/blog/<slug>", target: "/blog/<slug>/index.html", status: "200" },
            { source: "/blog/<slug>/", target: "/blog/<slug>/index.html", status: "200" },
            { source: "/case-studies", target: "/case-studies/index.html", status: "200" },
            { source: "/case-studies/", target: "/case-studies/index.html", status: "200" },
            {
                source: "/case-studies/<slug>",
                target: "/case-studies/<slug>/index.html",
                status: "200",
            },
            {
                source: "/case-studies/<slug>/",
                target: "/case-studies/<slug>/index.html",
                status: "200",
            },
            { source: "/contact", target: "/contact/index.html", status: "200" },
            { source: "/contact/", target: "/contact/index.html", status: "200" },
            { source: "/privacy-policy", target: "/privacy-policy/index.html", status: "200" },
            { source: "/privacy-policy/", target: "/privacy-policy/index.html", status: "200" },
            { source: "/terms-of-use", target: "/terms-of-use/index.html", status: "200" },
            { source: "/terms-of-use/", target: "/terms-of-use/index.html", status: "200" },
            { source: "/test", target: "/test/index.html", status: "200" },
            { source: "/test/", target: "/test/index.html", status: "200" },
        ],
    }),
    integrations: [
        react(),
        sentry({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: hasSentryOrg && hasSentryProject ? process.env.SENTRY_AUTH_TOKEN : undefined,
        }),
    ],
    site: process.env.SITE_URL,
    build: {
        format: "directory",
    },
});
