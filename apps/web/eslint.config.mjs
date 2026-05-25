import rootConfig from "../../eslint.config.mjs";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default [
    {
        ignores: ["dist/**", ".astro/**", ".amplify-hosting/**", "worker-configuration.d.ts"],
    },
    ...rootConfig,
    {
        files: ["**/*.{tsx,jsx}"],
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
            "no-console": ["error", { allow: ["warn", "error"] }],
            "max-lines": ["error", { max: 500, skipBlankLines: false, skipComments: false }],
        },
    },
    ...astroPlugin.configs["flat/recommended"],
    {
        files: ["**/*.astro"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                parser: "@typescript-eslint/parser",
                project: resolve(__dirname, "tsconfig.json"),
                extraFileExtensions: [".astro"],
            },
        },
        rules: {
            "astro/no-set-html-directive": "error",
            "astro/no-unused-css-selector": "warn",
            "no-console": ["error", { allow: ["warn", "error"] }],
            "max-lines": ["error", { max: 500, skipBlankLines: false, skipComments: false }],
        },
    },
];
