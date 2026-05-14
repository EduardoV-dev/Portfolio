# Portfolio

Personal portfolio website built as a pnpm monorepo, featuring an Astro + React frontend and a Strapi CMS backend.

## Structure

```
apps/
├── web/            # Astro + React — public-facing website  (port 4321)
└── headless-cms/   # Strapi 5 CMS — content backend (WIP)  (port 1337)
```

## Tech stack

| Concern | Tool |
|---|---|
| Frontend framework | Astro 5 + React 19 |
| Language | TypeScript |
| Package manager | pnpm 10 (workspaces) |
| CMS | Strapi 5 |
| Database (Docker) | PostgreSQL 16 |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |
| Pre-commit hooks | Husky + lint-staged |
| Commit conventions | commitlint (conventional commits) |
| CI/CD | GitHub Actions → AWS S3 + CloudFront |

## Prerequisites

- Node.js `>=22.0.0`
- pnpm `10` — `npm i -g pnpm`
- Docker + Docker Compose (for the Docker workflow)

---

## Getting started

### Option A — Docker Compose (recommended)

Docker Compose runs the full stack (web + Strapi + PostgreSQL) with hot reload, without needing Node or pnpm installed locally.

**1. Copy the env files**

```bash
cp apps/web/.env.example        apps/web/.env
cp apps/headless-cms/.env.example apps/headless-cms/.env
```

Fill in the real values where the examples contain placeholders (see [Environment variables](#environment-variables) below).

**2. Start all services**

```bash
docker compose up
```

| Service | URL |
|---|---|
| Frontend (Astro) | http://localhost:4321 |
| Strapi admin | http://localhost:1337/admin |
| PostgreSQL | `localhost:5432` |

**3. Stop**

```bash
docker compose down          # stop containers, keep volumes
docker compose down -v       # stop and delete all volumes (wipes DB)
```

> **Windows / macOS — file watching:** if hot reload doesn't trigger, uncomment `CHOKIDAR_USEPOLLING: "true"` in `docker-compose.yml` under the `headless-cms` service.

---

### Option B — Local pnpm

**1. Copy the env files**

```bash
cp apps/web/.env.example        apps/web/.env
cp apps/headless-cms/.env.example apps/headless-cms/.env
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Start both apps in parallel**

```bash
pnpm dev
```

To start only the frontend:

```bash
pnpm dev:frontend
```

---

## Environment variables

### `apps/web/.env`

| Variable | Description |
|---|---|
| `SITE_URL` | Canonical base URL — use `http://localhost:4321` locally |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form |
| `PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key |

### `apps/headless-cms/.env`

| Variable | Description |
|---|---|
| `ADMIN_JWT_SECRET` | Secret for Strapi admin JWTs |
| `APP_KEYS` | Comma-separated session keys |
| `API_TOKEN_SALT` | Salt for API tokens |
| `JWT_SECRET` | Secret for content API JWTs |
| `DATABASE_*` | Database connection — pre-filled to match `docker-compose.yml` defaults |

---

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start frontend and Strapi in parallel |
| `pnpm dev:frontend` | Start the Astro dev server only |
| `pnpm dev:strapi` | Start the Strapi dev server only |
| `pnpm format` | Format all files with Prettier |
| `pnpm check` | Lint + Prettier check (no writes) |
| `pnpm --filter web lint` | ESLint on the frontend |
| `pnpm --filter web typecheck` | `astro check` (TypeScript + Astro diagnostics) |
| `pnpm --filter web build` | Production build |

---

## Code quality

**Pre-commit hook** (`husky` + `lint-staged`) runs on every commit:

1. ESLint on staged frontend files
2. Prettier format check on staged frontend files
3. TypeScript check (`astro check`) on staged `.ts`/`.tsx`/`.astro` files
4. Full frontend build (`astro build`)

> Lint-staged checks format but **does not auto-fix**. If the commit is blocked by a format error, run `pnpm format`, re-stage the files, then retry.

**CI** (GitHub Actions) runs on pull requests to `main` or `development`:

1. Lint → Typecheck → Format check → Build

**CD** — push to `development` deploys to AWS S3 + CloudFront via OIDC.

### Strapi Cloud deploy strategy (monorepo)

To avoid rebuilding Strapi on every frontend-only push:

1. In Strapi Cloud, set environment branch to `cms-production`.
2. Keep `Base directory` set to `apps/headless-cms`.
3. Keep `Deploy on push` enabled for that environment.
4. This repo workflow `.github/workflows/strapi-branch-sync.yml` syncs `main` -> `cms-production` only when CMS-related paths change.

That means frontend-only commits to `main` do not trigger Strapi Cloud deployments.

---

## Commit conventions

Commits follow the [Conventional Commits](https://www.conventionalcommits.org) spec, enforced by `commitlint`.

```
feat: add hero section animation
fix: correct mobile nav overflow
chore: update dependencies
```
