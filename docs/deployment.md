# Deployment

## Branch Strategy

- `staging` branch -> staging environments
- `main` branch -> production environments

Used by both web and CMS.

## Frontend Deployment (Cloudflare Workers)

- Workflow files:
  - `.github/workflows/deploy-staging.yml`
  - `.github/workflows/deploy-production.yml`
- Trigger:
  - push to `staging` (staging deploy)
  - push to `main` (production deploy)
- Build + deploy executed from `apps/web` with Wrangler.

## CMS Deployment (Strapi Cloud)

- Hosted in Strapi Cloud.
- Auto deploy from same repository:
  - `staging` -> Strapi Cloud staging environment
  - `main` -> Strapi Cloud production environment

## CI Validation

- PR checks in `.github/workflows/frontend-integration.yml` run:
  - web lint/typecheck/format/build
  - CMS build

## Local Deployment-Like Stack

- `docker-compose.yml` runs:
  - web dev container
  - headless-cms dev container
  - postgres container

Use for integration checks before pushing.
