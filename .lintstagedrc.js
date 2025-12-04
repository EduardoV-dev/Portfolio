module.exports = {
    "*.{js,jsx,ts,tsx}": ["pnpm format:check", "pnpm lint"],
    "*.{json,css,scss,md}": ["pnpm format:check"],
};
