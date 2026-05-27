# Web App (`apps/web`)

Astro + React frontend for portfolio site.

## Stack

| Concern | Tool |
|---|---|
| Framework | Astro 6 |
| UI | React 19 |
| Language | TypeScript (strict) |
| Styling | CSS + PostCSS |
| Linting | ESLint 9 |
| Formatting | Prettier 3 |
| Type checks | `astro check` |

## Prerequisites

- Node.js `>=22`
- pnpm `11`

## Environment Variables

Create file first:

```bash
cp .env.example .env
```

Main public vars:

| Variable | Purpose |
|---|---|
| `PUBLIC_ENVIRONMENT` | Environment label (`development`, `staging`, `production`) |
| `PUBLIC_SITE_URL` | Canonical site URL (local: `http://localhost:4321`) |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form provider key |

`PUBLIC_SITE_URL` should always be set.

## Run

From repo root:

```bash
pnpm dev:web
```

Or from this directory:

```bash
pnpm dev
```

Default URL: `http://localhost:4321`.

## Scripts

Use via `pnpm --filter web <script>` from root, or run directly in `apps/web`.

| Script | Description |
|---|---|
| `dev` | Start Astro dev server |
| `build` | Production build |
| `preview` | Preview production build |
| `lint` | ESLint checks |
| `formatcheck` | Prettier check only |
| `format` | Prettier write |
| `typecheck` | `astro check` |
| `check` | lint + formatcheck + typecheck |

## Validation

Recommended before commit:

```bash
pnpm --filter web lint
pnpm --filter web typecheck
pnpm --filter web build
```

Focused checks:

```bash
# one file lint
pnpm --filter web exec eslint src/path/to/file.tsx

# one file format check
pnpm --filter web exec prettier --check src/path/to/file.tsx
```

Note: `astro check` is project-wide, not single-file.

## Structure

```text
src/
|- assets/
|- components/
|- constants/
|- layouts/
|- modules/
|- pages/
|- store/
`- styles/
```

Path alias: `@/*` -> `src/*`.

## Related Project Docs

- `docs/frontend.md` - frontend structure and conventions
- `docs/feature-development.md` - feature implementation workflow
- `docs/environment.md` - env variable ownership and usage
- `docs/deployment.md` - staging/production deployment flow
- `docs/troubleshooting.md` - common issues and fixes
