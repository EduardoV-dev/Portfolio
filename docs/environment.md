# Environment Variables

Use these files as base templates:

- `apps/web/.env.example`
- `apps/headless-cms/.env.example`

## Web App (`apps/web`)

## Public vars (client-visible)

- `PUBLIC_ENVIRONMENT`
- `PUBLIC_SITE_URL`
- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_SENTRY_ENABLED`
- `PUBLIC_SENTRY_DSN`
- `PUBLIC_WEB3FORMS_ACCESS_KEY`

## Server/build/runtime vars

- `SENTRY_DSN`
- `SENTRY_RELEASE`
- `SENTRY_ENVIRONMENT`
- `SENTRY_SAMPLE_RATE`
- `SENTRY_TRACES_SAMPLE_RATE`
- `SENTRY_PROFILES_SAMPLE_RATE`
- `SENTRY_DEBUG`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_AUTH_TOKEN`
- `STRAPI_CMS_OPTIONAL`
- `STRAPI_API_URL`
- `STRAPI_API_TOKEN`
- `STRAPI_WEBHOOK_SECRET`
- `GITHUB_ACTIONS_TOKEN`
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`
- `GITHUB_REBUILD_WORKFLOW_FILE`
- `GITHUB_REBUILD_REF`
- `AI_PROVIDER_API_KEY`
- `AI_PROVIDER_BASE_URL`

## CMS (`apps/headless-cms`)

- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `DATABASE_CLIENT`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_NAME`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `DATABASE_SSL`

## Platform Ownership

- Cloudflare Worker vars/secrets: web runtime and API routes.
- GitHub Actions vars/secrets: CI and frontend deployment workflows.
- Strapi Cloud vars/secrets: CMS runtime per environment.
