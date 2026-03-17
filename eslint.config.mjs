import js from "@eslint/js";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/.astro/**",
            "**/.strapi/**",
            "**/build/**",
            "**/.cache/**",
            "**/coverage/**",
            "**/.env*",
            "**/.gitignore",
            "**/*.md",
            "pnpm-lock.yaml",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "error",
            "prefer-const": "error",
            "no-var": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports", fixStyle: "inline-type-imports" },
            ],
        },
    },
    {
        files: ["**/*.cjs"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        files: ["apps/frontend/**/*.{tsx,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }],
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "jsx-a11y/control-has-associated-label": "off",
        },
    },
    ...astroPlugin.configs.recommended,
    {
        files: ["apps/frontend/**/*.astro"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            "astro/no-set-html-directive": "error",
            "astro/no-unused-css-selector": "warn",
        },
    },
    {
        files: ["apps/strapi/**/*.{js,ts,mjs,cjs}"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];
