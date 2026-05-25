# AGENTS.md

Repo guidance for agentic coding agents working in this monorepo.

## Workspace Overview

- Package manager: `pnpm@11.0.9` (workspace root).
- Runtime: Node `>=22` for root + `apps/web`; Strapi allows `>=20 <=24`.
- Workspace packages from `pnpm-workspace.yaml`: `apps/*`.
- Apps:
  - `apps/web`: Astro + React + TypeScript frontend.
  - `apps/headless-cms`: Strapi CMS.
- Root `.npmrc`:
  - `ignore-scripts=true` (important for Husky behavior).
  - `node-linker=hoisted`.

## Build, Lint, Typecheck, Test Commands

This repo has no dedicated test runner today (no Jest/Vitest/Playwright scripts).
Use lint/typecheck/build as validation gates.

### Install

```bash
pnpm install
```

### Local Development

```bash
pnpm dev                  # web + headless-cms in parallel
pnpm dev:web              # only apps/web
pnpm dev:headless-cms     # only apps/headless-cms
```

### Web App Validation (`apps/web`)

```bash
pnpm --filter web lint
pnpm --filter web formatcheck
pnpm --filter web typecheck
pnpm --filter web check        # lint + formatcheck + typecheck
pnpm --filter web build
```

### CMS Validation (`apps/headless-cms`)

```bash
pnpm --filter headless-cms lint
pnpm --filter headless-cms build
```

### Formatting

```bash
pnpm --filter web format        # write formatting in web app
pnpm --filter web formatcheck   # check formatting only
```

### Single Test / Single File Guidance

Because no test framework configured, no `test` or "single-test" command exists.
Closest equivalent for focused checks:

```bash
# Lint one file
pnpm --filter web exec eslint src/path/to/file.tsx

# Typecheck whole web project (Astro/TS project-wide)
pnpm --filter web typecheck

# Prettier check one file
pnpm --filter web exec prettier --check src/path/to/file.tsx
```

If real unit/integration tests added later, update this section with exact
single-test invocation.

## Git Hooks and Commit Rules

- Husky hooks exist in `.husky/`, but `ignore-scripts=true` can prevent auto setup.
- If hooks missing after install, run `pnpm husky` manually.
- Pre-commit hook (`.husky/pre-commit`) runs:
  1. `npx lint-staged`
  2. `pnpm --filter web build`
  3. `pnpm --filter headless-cms build`
- Commit message hook enforces Conventional Commits via:
  - `commitlint.config.js` extending `@commitlint/config-conventional`.

## Lint-Staged Scope

From `.lintstagedrc.json`:

- `apps/web/**/*.{js,ts,jsx,tsx,mjs,astro}`:
  - `pnpm --filter web exec eslint`
  - `pnpm --filter web exec prettier --check`
- `apps/web/**/*.{json,css}`:
  - `pnpm --filter web exec prettier --check`
- `apps/web/**/*.{ts,tsx,astro}`:
  - `pnpm --filter web typecheck`

## Code Style and Conventions

Follow existing config files first:

- ESLint root: `eslint.config.mjs`
- ESLint web: `apps/web/eslint.config.mjs`
- Prettier: `prettier.config.cjs`
- TypeScript web: `apps/web/tsconfig.json`

### Formatting

- Prettier is source of truth.
- 4 spaces, no tabs.
- Max line width: 100.
- Semicolons required.
- Double quotes (`singleQuote: false`).
- Trailing commas enabled (`trailingComma: "all"`).
- Astro files formatted via `prettier-plugin-astro`.

### Imports

- Use `@/*` alias for internal web imports (`@/* -> apps/web/src/*`).
- Prefer type-only imports when importing types.
- Enforced style: inline type imports.
  - Good: `import { type Foo } from "@/lib/foo";`
  - Avoid: `import type { Foo } from "@/lib/foo";`
- Keep CSS/module style imports after JS/TS imports when possible.

### Types and TypeScript

- Web TS config extends `astro/tsconfigs/strict`; keep strict typing.
- Avoid `any`; rule is warn, but treat as near-error.
- Prefer `unknown` + narrowing over `any`.
- In React/Astro props, use explicit, named prop types/interfaces.
- Do not bypass type errors with broad casts unless unavoidable.

### Naming

- Components: `PascalCase`.
- Variables/functions: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only for true constants/env-like values.
- Files in frontend commonly use kebab-case directories with `index.tsx` or
  `index.astro`; preserve local pattern when editing.
- CSS class names: existing project often uses BEM-like naming; keep consistent
  with file being edited.

### Error Handling

- Never swallow meaningful errors silently in critical paths.
- For expected UI failures, set explicit error state and render feedback.
- `console.log` disallowed in web app (`no-console` error except warn/error).
- Allowed logging in web: `console.warn`, `console.error`.
- Prefer guard clauses and early returns over deeply nested conditionals.

### Astro/React Rules

- `.astro` files: do not use `set:html` (`astro/no-set-html-directive`: error).
- Keep accessibility lint rules green (`jsx-a11y` + Astro recommended set).
- React `prop-types` not required (TypeScript project).
- Do not add huge files casually; `max-lines` rule enforced at 500 lines in web.

## Agent Operating Notes

- Before finalizing changes, run targeted checks for touched areas.
- Minimum recommended verification for frontend edits:
  1. `pnpm --filter web lint`
  2. `pnpm --filter web typecheck`
  3. `pnpm --filter web build`
- For CMS edits, also run:
  - `pnpm --filter headless-cms lint`
  - `pnpm --filter headless-cms build`
- Prefer small, focused diffs; avoid unrelated refactors.

## Cursor/Copilot Rules

- Checked for Cursor rules:
  - `.cursorrules`: not present.
  - `.cursor/rules/`: not present.
- Checked for Copilot instructions:
  - `.github/copilot-instructions.md`: not present.
- If these files are added later, merge their guidance into this document.
