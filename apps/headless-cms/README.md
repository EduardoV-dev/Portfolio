# Headless CMS (`apps/headless-cms`)

Strapi 5 backend for portfolio content.

## Stack

| Concern | Tool |
|---|---|
| CMS | Strapi 5 |
| Language | TypeScript |
| DB support | PostgreSQL or SQLite |

## Prerequisites

- Node.js `>=20 <=24` (package engines)
- pnpm `11`

## Environment Variables

Create env file first:

```bash
cp .env.example .env
```

Core vars:

| Variable | Purpose |
|---|---|
| `APP_KEYS` | Comma-separated app keys |
| `API_TOKEN_SALT` | API token salt |
| `ADMIN_JWT_SECRET` | Admin JWT secret |
| `TRANSFER_TOKEN_SALT` | Transfer token salt |
| `JWT_SECRET` | API JWT secret |
| `ENCRYPTION_KEY` | Data encryption key |
| `DATABASE_*` | DB connection settings |

## Run

From repo root:

```bash
pnpm dev:headless-cms
```

Or from this directory:

```bash
pnpm dev
```

Default admin URL: `http://localhost:1337/admin`.

## Scripts

Use via `pnpm --filter headless-cms <script>` from root, or run directly here.

| Script | Description |
|---|---|
| `dev` / `develop` | Start Strapi with watch mode |
| `start` | Start Strapi in production mode |
| `build` | Build admin panel |
| `lint` | Run ESLint |
| `console` | Open Strapi console |
| `upgrade` | Upgrade Strapi to latest |
| `upgrade:dry` | Dry-run upgrade |

## Validation

Recommended before commit:

```bash
pnpm --filter headless-cms lint
pnpm --filter headless-cms build
```

## Deployment

- Hosted in Strapi Cloud.
- Uses same GitHub repo branch strategy as frontend:
  - `staging` branch -> Strapi Cloud staging environment
  - `main` branch -> Strapi Cloud production environment

## Notes

- CMS exists in monorepo but frontend may still use static content sources.
- Pre-commit hook from repo root runs CMS build, so local CMS build health matters.

## Related Project Docs

- `docs/cms.md` - CMS structure and operating model
- `docs/content-model.md` - content type and relation map
- `docs/feature-development.md` - adding CMS-backed features
- `docs/environment.md` - env variable ownership and usage
- `docs/deployment.md` - Strapi Cloud staging/production flow
