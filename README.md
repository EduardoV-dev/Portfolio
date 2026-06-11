# Portfolio Monorepo

Personal portfolio workspace using pnpm workspaces.

## Apps

```text
apps/
|- web            Astro + React frontend (default: http://localhost:4321)
`- headless-cms   Strapi 5 CMS (default: http://localhost:1337)
```

## Deployment Model

- Frontend (`apps/web`) deploys to Cloudflare Workers.
- CMS (`apps/headless-cms`) deploys to Strapi Cloud.
- Both use same branch strategy:
  - `staging` -> staging environments
  - `main` -> production environments

## Tech Stack

| Concern | Tool |
|---|---|
| Workspace | pnpm workspaces |
| Frontend | Astro 6 + React 19 + TypeScript |
| CMS | Strapi 5 |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier 3 |
| Hooks | Husky + lint-staged + commitlint |

## Prerequisites

- Node.js `>=22` (root + web)
- pnpm `11` (`pnpm@11.0.9` in `packageManager`)

## Install

```bash
pnpm install
```

## Environment Setup

Copy env files before running apps:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/headless-cms/.env.example apps/headless-cms/.env
```

See app-specific docs for variable details:

- `apps/web/README.md`
- `apps/headless-cms/README.md`

## Development

```bash
pnpm dev                  # run web + headless-cms in parallel
pnpm dev:web              # run only web
pnpm dev:headless-cms     # run only CMS
```

## Validation Commands

This repo currently has no dedicated test runner (no Jest/Vitest/Playwright).
Use lint/typecheck/build commands as quality gates.

```bash
# Frontend (apps/web)
pnpm --filter web lint
pnpm --filter web formatcheck
pnpm --filter web typecheck
pnpm --filter web check
pnpm --filter web build

# CMS (apps/headless-cms)
pnpm --filter headless-cms lint
pnpm --filter headless-cms build
```

### Single File / Focused Checks

```bash
# Lint one frontend file
pnpm --filter web exec eslint src/path/to/file.tsx

# Prettier check one frontend file
pnpm --filter web exec prettier --check src/path/to/file.tsx

# Typecheck is project-wide in Astro
pnpm --filter web typecheck
```

## Git Hooks and Commit Rules

- `.npmrc` sets `ignore-scripts=true`, so Husky may not auto-install on `pnpm install`.
- If hooks missing, run:

```bash
pnpm husky
```

- Pre-commit hook (`.husky/pre-commit`) runs:
  1. `npx lint-staged`
  2. `pnpm --filter web build`
  3. `pnpm --filter headless-cms build`
- Commit messages follow Conventional Commits via `commitlint`.

## Repository Notes

- Workspace packages configured in `pnpm-workspace.yaml` with `apps/*`.
- Root scripts intentionally small; app scripts live in each app package.
- Prefer `pnpm --filter <package>` from repo root for repeatable commands.

## Documentation in Apps

- `apps/web/README.md` covers frontend scripts, env, structure, and checks.
- `apps/headless-cms/README.md` covers Strapi setup, env, and scripts.

## Contributor Docs

- `docs/README.md` for architecture, feature development, env, deployment, and troubleshooting guides.
