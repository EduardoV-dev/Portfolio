# CMS Guide

## Structure

- `apps/headless-cms/src/api` - content type APIs
- `apps/headless-cms/src/components` - reusable Strapi components
- `apps/headless-cms/config` - server, database, admin, plugins config

## Current Content APIs

- `project`
- `project-detail`
- `project-category`
- `skill`
- `skill-category`
- `tag`
- `my-profile` (single type)
- `ping` (health endpoint)

Most routes/controllers/services use Strapi core factories (default CRUD).

## Local Run

```bash
pnpm dev:headless-cms
```

Default admin URL: `http://localhost:1337/admin`.

## Database

- Config: `apps/headless-cms/config/database.ts`.
- Supports `postgres`, `mysql`, `sqlite`.
- Local Docker setup uses PostgreSQL.

## Deployment

- Hosted on Strapi Cloud.
- Same repository branch mapping as frontend:
  - `staging` -> staging
  - `main` -> production
