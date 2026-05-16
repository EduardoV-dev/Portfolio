# Frontend — `apps/web`

Astro + React frontend for the personal portfolio website.

## Tech stack

| Concern | Tool |
|---|---|
| Framework | Astro 5 |
| UI components | React 19 |
| Language | TypeScript (strict mode) |
| Styling | CSS Modules + PostCSS |
| State | Zustand 5 |
| Carousel | Embla Carousel |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |
| Type checking | `astro check` |

## Prerequisites

- Node.js `>=22.0.0`
- pnpm `10`

## Environment variables

Copy the example file before starting:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PUBLIC_SITE_URL` | Canonical base URL — use `http://localhost:4321` locally |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form |
| `PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key |

> `PUBLIC_SITE_URL` is required — missing it produces wrong canonical URLs in production builds.

## Getting started

Dependencies are installed from the monorepo root:

```bash
# From the repository root
pnpm install

# Start the Astro dev server
pnpm dev:frontend
```

Or start the full stack (frontend + Strapi):

```bash
pnpm dev
```

The dev server runs at `http://localhost:4321` by default.

## Scripts

Run from the monorepo root via `--filter web`, or directly from this directory:

| Script | Description |
|---|---|
| `pnpm dev` | Start the Astro dev server |
| `pnpm build` | Build for production (output to `dist/`) |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run `astro check` (TypeScript + Astro diagnostics) |
| `pnpm formatcheck` | Check formatting with Prettier (no writes) |
| `pnpm format` | Format all files with Prettier |
| `pnpm check` | Lint + format check + typecheck combined |

> `astro check` requires `.astro/types.d.ts`, which is generated on first `astro dev` or `astro build`. On a fresh clone, run `pnpm dev` once before running `pnpm typecheck`.

## Project structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Shared, reusable UI components
├── constants/      # App-wide constants (e.g. route definitions)
├── data/           # Static data sources (projects.ts, posts.ts)
├── layouts/        # Page layout wrappers (header, footer, shell)
├── modules/        # Page-specific feature modules (home, blog, contact, …)
├── pages/          # Astro file-based routes
├── store/          # Zustand stores
└── styles/         # Global styles and PostCSS mixins
```

## Path aliases

`@/*` maps to `src/*`, configured in `tsconfig.json`.

```ts
import { ROUTES } from "@/constants/routes";
import { useChatStore } from "@/store/chat";
```
