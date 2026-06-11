# Tech Stack

## Core

- Package manager: `pnpm@11`
- Runtime: Node `>=22` (web/root), Node `>=20 <=24` (CMS)
- Monorepo: pnpm workspaces

## Frontend (`apps/web`)

- Framework: Astro 6
- UI: React 19
- Language: TypeScript (strict Astro config)
- Styling: CSS + PostCSS
- State (interactive areas): Zustand
- CMS client: `@strapi/client`
- Observability: Sentry (`@sentry/astro`, `@sentry/cloudflare`)
- Deploy target: Cloudflare Workers + Wrangler

## CMS (`apps/headless-cms`)

- CMS: Strapi 5
- Language: TypeScript
- DB support: PostgreSQL or SQLite
- Hosting: Strapi Cloud

## Quality and Workflow

- Lint: ESLint 9
- Format: Prettier 3
- Typecheck: `astro check` (web)
- Hooks: Husky + lint-staged + commitlint
- CI: GitHub Actions
