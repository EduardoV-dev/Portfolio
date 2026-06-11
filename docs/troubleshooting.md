# Troubleshooting

## Husky hooks not running

- Root `.npmrc` has `ignore-scripts=true`.
- Run `pnpm husky` after install if hooks missing.

## Web build fails with missing env vars

- Check `apps/web/.env` against `apps/web/.env.example`.
- Ensure required deploy vars/secrets exist in CI/Cloudflare.

## CMS unreachable from web

- Verify `STRAPI_API_URL` and `STRAPI_API_TOKEN`.
- In local Docker, web uses `http://headless-cms:1337/api`.
- Test CMS health endpoint `/ping`.

## CMS fallback behavior confusing

- `STRAPI_CMS_OPTIONAL=true` enables fallback responses.
- Fallback proxy logic in `apps/web/src/utils/cms-fallback.ts`.

## API rate limit errors

- Worker requires rate limiter bindings in `apps/web/wrangler.jsonc`.
- In non-development env, missing bindings return 500.

## Rebuild webhook not triggering frontend deploy

- Confirm endpoint: `POST /api/strapi-rebuild`.
- Confirm `Authorization` bearer token matches `STRAPI_WEBHOOK_SECRET`.
- Confirm event header is allowed (`entry.publish`, `entry.unpublish`).
- Confirm `GITHUB_ACTIONS_TOKEN` and `GITHUB_*` vars are set.
