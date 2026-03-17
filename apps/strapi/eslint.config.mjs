import rootConfig from "../../eslint.config.mjs";

export default [
    ...rootConfig,
    {
        files: ["**/*.{js,ts,mjs,cjs}"],
        rules: {
            "no-console": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];
