# Architecture

## Monorepo

- Workspace managed by `pnpm` with `apps/*` packages.
- Apps:
  - `apps/web` - Astro + React frontend
  - `apps/headless-cms` - Strapi 5 CMS

## Web App Shape

- Route files in `apps/web/src/pages`.
- Route sections in `apps/web/src/modules`.
- Reusable UI in `apps/web/src/components`.
- Shared frame in `apps/web/src/layouts/layout/index.astro`.
- CMS integrations in `apps/web/src/api` and `apps/web/src/lib/strapi.ts`.

## CMS Shape

- Content APIs in `apps/headless-cms/src/api`.
- Reusable Strapi components in `apps/headless-cms/src/components`.
- Runtime config in `apps/headless-cms/config`.

## Data Flow

1. Strapi content edited in CMS.
2. Frontend reads content through service files in `apps/web/src/api`.
3. Astro pages/modules render static pages and hydrated React islands.

## Runtime Model

- Web app runs as Astro server output on Cloudflare Workers (`apps/web/astro.config.mjs`).
- Mixed rendering:
  - prerendered pages for public routes
  - runtime API endpoints under `apps/web/src/pages/api`

## Important API Endpoints

- `POST /api/ai-chat` - streamed AI responses with rate limiting.
- `POST /api/strapi-rebuild` - receives Strapi webhook and dispatches GitHub workflow.
