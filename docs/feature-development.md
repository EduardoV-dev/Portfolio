# Feature Development

## Add Frontend-Only Feature

1. Add or update route in `apps/web/src/pages`.
2. Build section(s) in `apps/web/src/modules/<feature>`.
3. Extract reusable UI into `apps/web/src/components` if needed.
4. Keep route metadata (title/description/canonical) in page/layout usage.

## Add CMS-Backed Feature

1. Add/modify Strapi schema in `apps/headless-cms/src/api/*/content-types/*/schema.json`.
2. If needed, add Strapi component schema in `apps/headless-cms/src/components`.
3. Implement frontend service in `apps/web/src/api/<domain>.ts`.
4. Add/adjust frontend types in `apps/web/src/types`.
5. Render new data in module/page components.

## Add Worker API Endpoint

1. Create file in `apps/web/src/pages/api/<name>.ts`.
2. Set `export const prerender = false`.
3. Reuse shared response/rate-limit helpers from `apps/web/src/pages/api/_utils`.
4. Use structured error logging through existing logger utility.

## If Content Should Trigger Frontend Rebuild

1. Confirm Strapi webhook sends allowed event (`entry.publish` or `entry.unpublish`).
2. Ensure webhook uses `Authorization: Bearer <STRAPI_WEBHOOK_SECRET>`.
3. Verify rebuild endpoint config in web environment (`GITHUB_*`, `STRAPI_WEBHOOK_SECRET`).

## Validation Before PR

```bash
pnpm --filter web lint
pnpm --filter web formatcheck
pnpm --filter web typecheck
pnpm --filter web build
pnpm --filter headless-cms lint
pnpm --filter headless-cms build
```
