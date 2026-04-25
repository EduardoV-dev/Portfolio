# Headless CMS — `apps/headless-cms`

Strapi 5 content backend for the portfolio. Currently scaffolded and not yet wired to the frontend.

## Tech stack

| Concern | Tool |
|---|---|
| CMS | Strapi 5 |
| Language | TypeScript |
| Database (Docker) | PostgreSQL 16 |
| Database (local) | SQLite (default fallback) |

## Prerequisites

- Node.js `>=22.0.0`
- pnpm `10`
- A running PostgreSQL instance (provided automatically via Docker Compose)

## Environment variables

Copy the example file before starting:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `ADMIN_JWT_SECRET` | Secret for Strapi admin panel JWTs |
| `APP_KEYS` | Comma-separated session keys (four values) |
| `API_TOKEN_SALT` | Salt used to generate API tokens |
| `JWT_SECRET` | Secret for content API JWTs |
| `DATABASE_CLIENT` | `postgres` or `sqlite` |
| `DATABASE_HOST` | DB host — `127.0.0.1` locally, `postgres` in Docker |
| `DATABASE_PORT` | DB port — `5432` |
| `DATABASE_NAME` | Database name — `portfolio` |
| `DATABASE_USERNAME` | DB user — `portfolio` |
| `DATABASE_PASSWORD` | DB password — `portfolio` |
| `DATABASE_SSL` | `false` for local/Docker |

> When running via Docker Compose, the `DATABASE_HOST` and other database variables are overridden by the values in `docker-compose.yml`. The `.env` values apply for local development only.

## Getting started

### Via Docker Compose (recommended)

Start from the monorepo root — Strapi, PostgreSQL, and the frontend all start together:

```bash
docker compose up
```

Strapi admin panel: http://localhost:1337/admin

### Via pnpm (local)

Ensure a PostgreSQL instance is reachable at the coordinates in your `.env`, then from the monorepo root:

```bash
pnpm dev:strapi
```

Or start everything at once:

```bash
pnpm dev
```

## Scripts

Run from the monorepo root via `--filter headless-cms`, or directly from this directory:

| Script | Description |
|---|---|
| `pnpm dev` | Start Strapi with auto-reload enabled |
| `pnpm start` | Start Strapi with auto-reload disabled (production-like) |
| `pnpm build` | Build the Strapi admin panel |
