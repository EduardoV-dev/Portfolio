# Frontend

Astro + React frontend for the personal portfolio website.

## Tech stack

| Concern | Tool |
|---|---|
| Framework | Astro 5 |
| UI components | React 19 |
| Language | TypeScript (strict mode) |
| Styling | CSS Modules + PostCSS |
| Carousel | Embla Carousel |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |
| Type checking | `astro check` |

## Prerequisites

- Node.js `>=22.0.0`
- pnpm `10`

## Getting started

Dependencies are installed from the monorepo root:

```bash
# From the repository root
pnpm install

# Start the Astro dev server
pnpm dev:frontend
```

Or start everything at once:

```bash
pnpm dev
```

The dev server runs at `http://localhost:4321` by default.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the Astro dev server |
| `pnpm build` | Build for production (output to `dist/`) |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run `astro check` (TypeScript + Astro diagnostics) |
| `pnpm format` | Format all files with Prettier |
| `pnpm check` | Lint + Prettier check (no writes) |

## Project structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Shared, reusable UI components
├── constants/      # App-wide constants (e.g. route definitions)
├── layouts/        # Page layout wrappers (header, footer, shell)
├── modules/        # Page-specific feature modules (e.g. home, about)
├── pages/          # Astro file-based routes
└── styles/         # Global styles and PostCSS mixins
```

## Path aliases

`@/*` maps to `src/*`, configured in `tsconfig.json`.

```ts
import { ROUTES } from "@/constants/routes";
```
