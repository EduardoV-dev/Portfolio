# Portfolio

Personal portfolio website built as a pnpm monorepo, featuring an Astro + React frontend and a Strapi CMS backend.

## Structure

```
apps/
├── frontend/   # Astro + React — public-facing website
└── strapi/     # Strapi CMS — content backend (WIP)
```

## Tech stack

| Concern | Tool |
|---|---|
| Frontend framework | Astro 5 + React 19 |
| Language | TypeScript |
| Package manager | pnpm 10 (workspaces) |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |
| Pre-commit hooks | Husky + lint-staged |
| Commit conventions | commitlint (conventional commits) |
| CI | GitHub Actions |

## Prerequisites

- Node.js `>=22.0.0`
- pnpm `10` — install with `npm i -g pnpm`

## Getting started

```bash
# Install all workspace dependencies
pnpm install

# Run both apps in parallel
pnpm dev
```

To run only the frontend:

```bash
pnpm dev:frontend
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start frontend and Strapi in parallel |
| `pnpm dev:frontend` | Start the Astro dev server only |
| `pnpm dev:strapi` | Start the Strapi dev server only |
| `pnpm lint` | Run ESLint across the whole monorepo |
| `pnpm format` | Format all files with Prettier |
| `pnpm check` | Lint + Prettier check (no writes) |

## Code quality

**Pre-commit hook** (`husky` + `lint-staged`) runs on every commit:

1. ESLint check on staged frontend files
2. Prettier format check on staged frontend files
3. TypeScript check (`astro check`) on staged `.ts`/`.tsx`/`.astro` files
4. Full frontend build (`astro build`)

**CI** (GitHub Actions) runs on pull requests targeting `main` or `development`:

1. Lint
2. Typecheck
3. Format check
4. Build

## Commit conventions

Commits follow the [Conventional Commits](https://www.conventionalcommits.org) spec, enforced by `commitlint`.

```
feat: add hero section animation
fix: correct mobile nav overflow
chore: update dependencies
```
