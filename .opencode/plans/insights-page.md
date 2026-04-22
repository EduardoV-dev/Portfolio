# Plan: Insights Page

## Modified files (1)

- `src/constants/routes.ts` — `"Blog"` → `"Insights"`, `/blog` → `/insights`

## New files (14)

### Data
- `src/data/posts.ts`
  - `ContentBlock` discriminated union: `paragraph | heading(2|3) | code | list | quote`
  - `Post` interface: `slug, title, description, date, readingTime, tags[], category, featured?, body: ContentBlock[]`
  - 5 seed posts (see below)
  - `getPostBySlug(slug)`, `getAllSlugs()`, `getAdjacentPosts(slug)` helpers

### Pages
- `src/pages/insights.astro` — `<Layout title="Insights – Eduardo Varela"><InsightsModule /></Layout>`
- `src/pages/insights/[slug].astro` — `getStaticPaths` from `getAllSlugs()`, passes post + adjacent posts to `<InsightsDetailModule />`

### Module: list page (`src/modules/insights/`)
- `index.astro` — composes: InsightsHero → InsightsFeatured → InsightsPosts → InsightsCta
- `insights-hero.astro` — label `INSIGHTS`, h1 `Engineering Insights`, subtext
- `insights-featured.astro` — static Astro, large card for the featured post; hover: scale + brightness; scroll reveal
- `insights-posts.tsx` + `.module.css` — React island (`client:visible`)
  - Filter buttons: All | Architecture | Backend | Cloud | Performance
  - Active button: accent bg + dark text
  - Grid: 2-col tablet, 3-col desktop
  - Each card: title, description, tags, date, reading time, `Read →` link
  - Empty state: message when no posts match filter
  - Hover: `translateY(-3px)` lift + accent border
- `insights-cta.astro` — "Want to discuss these ideas in practice?" + "Let's build scalable systems together." + Get in Touch button

### Module: detail page (`src/modules/insights-detail/`)
- `index.astro` — composes: InsightsDetailHeader → InsightsDetailBody → InsightsDetailNav → InsightsDetailCta
- `insights-detail-header.astro` — Back link, h1 title, date + reading time + tags meta row
- `insights-detail-body.astro` — renders `ContentBlock[]` via if/switch: `<p>` | `<h2>/<h3>` | `<pre><code>` | `<ul><li>` | `<blockquote>`; max-width ~720px, good line-height
- `insights-detail-nav.astro` — prev/next post links (passed as props from page)
- `insights-detail-cta.astro` — "Enjoyed this? Let's talk about how to apply it to your project." + CTA

## Seed posts

| # | Slug | Title | Category | Featured |
|---|---|---|---|---|
| 1 | `scalable-api-design` | How I Design Scalable APIs | `backend` | yes |
| 2 | `production-systems-lessons` | Lessons from Building Production Systems | `architecture` | — |
| 3 | `nodejs-performance` | Optimizing Performance in Node.js Applications | `performance` | — |
| 4 | `monolith-vs-microservices` | Monolith vs Microservices: Real Trade-offs | `architecture` | — |
| 5 | `scale-from-day-one` | Designing Systems for Scale from Day One | `cloud` | — |

## ContentBlock rendering (no set:html)

```astro
{block.type === "paragraph" && <p>{block.text}</p>}
{block.type === "heading" && block.level === 2 && <h2>{block.text}</h2>}
{block.type === "heading" && block.level === 3 && <h3>{block.text}</h3>}
{block.type === "code" && <pre><code class={`language-${block.language}`}>{block.snippet}</code></pre>}
{block.type === "list" && <ul>{block.items.map(item => <li>{item}</li>)}</ul>}
{block.type === "quote" && <blockquote><p>{block.text}</p>{block.attribution && <cite>{block.attribution}</cite>}</blockquote>}
```

## Design tokens used
- `--color-surface`, `--color-border`, `--color-accent`, `--color-text-primary/secondary`
- `--transition-fast`, `--transition-base`
- Container: `max-width: 1280px; margin: 0 auto; padding-inline: 1rem`
- Body content max-width: `720px`

## Verification
After all files created: `pnpm --filter apps-frontend lint && pnpm --filter apps-frontend typecheck && pnpm --filter apps-frontend build`
