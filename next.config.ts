import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    reactCompiler: true,
    images: {
        remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_CDN_URL}/**`)],
    },
};

export default createNextIntlPlugin()(nextConfig);
