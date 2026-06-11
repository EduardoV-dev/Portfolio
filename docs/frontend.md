# Frontend Guide

## Folder Map

- `apps/web/src/pages` - Astro routes
- `apps/web/src/modules` - route-level sections
- `apps/web/src/components` - shared UI
- `apps/web/src/layouts` - page frame and shared shell
- `apps/web/src/api` - data/service access layer
- `apps/web/src/lib` - client setup (Strapi)
- `apps/web/src/store` - client state (Zustand)
- `apps/web/src/styles` - global styles

## Patterns

- Keep pages thin: compose modules, avoid heavy page logic.
- Keep data fetching in `src/api/*` service files.
- Use React islands only for interactive features.
- Keep route constants in `apps/web/src/constants/routes.ts`.

## CMS Integration

- Strapi client setup: `apps/web/src/lib/strapi.ts`.
- Env resolution: `apps/web/src/constants/environment-variables.ts`.
- CMS fallback behavior: `apps/web/src/utils/cms-fallback.ts`.

## API Routes

- Location: `apps/web/src/pages/api`.
- Must set `export const prerender = false` for runtime behavior.
- Reuse helpers in `apps/web/src/pages/api/_utils`.

## Validation

Run before PR:

```bash
pnpm --filter web lint
pnpm --filter web typecheck
pnpm --filter web build
```
