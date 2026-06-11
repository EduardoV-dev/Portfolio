# Content Model

## Main Types

| Type | Kind | Purpose |
|---|---|---|
| `project` | collection | public case study cards + top-level project metadata |
| `project-detail` | collection | deep case study content for detail page |
| `project-category` | collection | category filters for projects |
| `skill` | collection | skills shown in project detail |
| `skill-category` | collection | groups for skills |
| `tag` | collection | project labels |
| `my-profile` | single | AI system prompt source |

## Key Relations

- `project.categories` -> many-to-many `project-category`
- `project.tags` -> many-to-many `tag`
- `project.detail` -> one-to-one `project-detail`
- `project-detail.skills` -> one-to-many `skill`

## Frontend Consumers

- `project` list/detail: `apps/web/src/api/projects.ts`
- `project-category`: `apps/web/src/api/project-categories.ts`
- `my-profile.systemPrompt`: `apps/web/src/api/my-profile.ts`, exposed as `apps/web/src/pages/eduardo-profile.md.ts`

## Notes

- `project-detail` holds heavy narrative fields (`overview`, `challenge`, `solution`, `impactDetails`, `learnings`).
- `project` keeps landing/listing optimized fields (`title`, `description`, `images`, `impact`, `bullets`).
