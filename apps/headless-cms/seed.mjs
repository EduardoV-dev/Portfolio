/**
 * Strapi seed script - idempotent multi-project seeding.
 * Usage: node seed.mjs
 *
 * Notes:
 * - Safe to run many times.
 * - Existing records reused by unique key (name/slug/title).
 * - Projects need at least one Media Library file because `images` is required.
 */

const BASE_URL = "http://localhost:1337";
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL ?? "eduardovarela139@gmail.com";
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD ?? "qi%75z&DmPgS";

async function request(path, { method = "GET", body, token, adminJwt } = {}) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (adminJwt) headers.Authorization = `Bearer ${adminJwt}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        json = { raw: text };
    }

    if (!res.ok) {
        console.error(`[${method} ${path}] ${res.status}`, JSON.stringify(json, null, 2));
        throw new Error(`Request failed: ${method} ${path} -> ${res.status}`);
    }

    return json;
}

async function getAdminJwt() {
    const res = await request("/admin/login", {
        method: "POST",
        body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    return res.data.token;
}

async function getOrCreateApiToken(adminJwt) {
    const list = await request("/admin/api-tokens", { adminJwt });
    const existing = list.data.find((token) => token.name === "Seed Token");

    if (existing) {
        const regen = await request(`/admin/api-tokens/${existing.id}/regenerate`, {
            method: "POST",
            adminJwt,
        });
        return regen.data.accessKey;
    }

    const created = await request("/admin/api-tokens", {
        method: "POST",
        adminJwt,
        body: {
            name: "Seed Token",
            description: "Token for idempotent project seeding",
            type: "full-access",
            lifespan: null,
        },
    });
    return created.data.accessKey;
}

async function findOne(endpoint, filterField, filterValue, token) {
    const qs = `filters[${filterField}][$eq]=${encodeURIComponent(filterValue)}&pagination[pageSize]=1`;
    const res = await request(`/api/${endpoint}?${qs}`, { token });
    return res.data?.[0] ?? null;
}

async function findOrCreate(endpoint, filterField, data, token) {
    const existing = await findOne(endpoint, filterField, data[filterField], token);
    if (existing) return existing.id;

    const res = await request(`/api/${endpoint}`, {
        method: "POST",
        token,
        body: { data },
    });
    return res.data.id;
}

async function getMediaIds(token) {
    const res = await request("/api/upload/files", { token });
    return Array.isArray(res) ? res.map((file) => file.id) : [];
}

async function findProjectBySlug(slug, token) {
    const qs = `filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`;
    const published = await request(`/api/projects?${qs}&status=published`, { token });
    if (published.data?.[0]) return published.data[0];

    const draft = await request(`/api/projects?${qs}&status=draft`, { token });
    return draft.data?.[0] ?? null;
}

const TECH_CATEGORIES = [
    "Frontend",
    "Language",
    "Styling",
    "State Management",
    "UI Library",
    "CMS / Backend",
    "Database",
    "Hosting",
    "CDN",
    "CI/CD",
    "Tooling",
    "Frontend Framework",
    "Forms",
    "HTTP Client",
    "Third-party Integration",
    "Data Visualization",
    "Rich Text",
    "Testing",
    "Dev Tooling",
    "Component Development",
    "DX / Code Quality",
    "Build",
    "Auth",
    "Data Fetching",
    "Infrastructure",
    "API",
    "Real-time",
    "Blockchain",
];

const TECHNOLOGIES = [
    { name: "Astro 5", category: "Frontend" },
    { name: "React 19", category: "Frontend" },
    { name: "TypeScript (strict)", category: "Language" },
    { name: "PostCSS + CSS Modules", category: "Styling" },
    { name: "Zustand 5", category: "State Management" },
    { name: "Embla Carousel", category: "UI Library" },
    { name: "Strapi 5", category: "CMS / Backend" },
    { name: "SQLite", category: "Database" },
    { name: "AWS S3", category: "Hosting" },
    { name: "AWS CloudFront", category: "CDN" },
    { name: "GitHub Actions", category: "CI/CD" },
    { name: "pnpm Workspaces", category: "Tooling" },
    { name: "ESLint + Prettier", category: "Tooling" },
    { name: "Husky + lint-staged", category: "Tooling" },
    { name: "Next.js 12", category: "Frontend Framework" },
    { name: "React 18", category: "Frontend Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Emotion (CSS-in-JS)", category: "Styling" },
    { name: "Zustand", category: "State Management" },
    { name: "React Query v3", category: "State Management" },
    { name: "React Hook Form", category: "Forms" },
    { name: "Axios", category: "HTTP Client" },
    { name: "VideoSDK RTC Prebuilt", category: "Third-party Integration" },
    { name: "Chart.js + react-chartjs-2", category: "Data Visualization" },
    { name: "React Quill", category: "Rich Text" },
    { name: "Jest + Testing Library", category: "Testing" },
    { name: "Storybook", category: "Component Development" },
    { name: "ESLint + Prettier + Husky", category: "DX / Code Quality" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript 4.6", category: "Frontend" },
    { name: "Ant Design 5", category: "Frontend" },
    { name: "React Router DOM 6", category: "Frontend" },
    { name: "React Hook Form 7", category: "Frontend" },
    { name: "React Quill 2", category: "Frontend" },
    { name: "React Query 3", category: "Data Fetching" },
    { name: "Axios 1.3", category: "Data Fetching" },
    { name: "axios-mock-adapter", category: "Dev Tooling" },
    { name: "Vite 2", category: "Build" },
    { name: "ESLint (Airbnb) + Prettier", category: "Dev Tooling" },
    { name: "JWT / typescript-cookie", category: "Auth" },
    { name: "React 17", category: "Frontend" },
    { name: "TypeScript 4.4", category: "Frontend" },
    { name: "Redux Toolkit", category: "Frontend" },
    { name: "React Router v6", category: "Frontend" },
    { name: "SASS/SCSS Modules", category: "Frontend" },
    { name: "Lottie / react-spring", category: "Frontend" },
    { name: "Apollo Client 3", category: "Data Fetching" },
    { name: "GraphQL", category: "API" },
    { name: "Socket.IO Client v4", category: "Real-time" },
    { name: "@solana/web3.js", category: "Blockchain" },
    { name: "Phantom Wallet Adapter", category: "Blockchain" },
    { name: "CRACO", category: "Build" },
];

const TAGS = [
    "Astro",
    "React",
    "TypeScript",
    "Strapi",
    "AWS",
    "PostCSS",
    "Zustand",
    "Embla",
    "CloudFront",
    "S3",
    "CI/CD",
    "Headless CMS",
    "Next.js",
    "React Query",
    "Emotion",
    "VideoSDK",
    "Chart.js",
    "SSR",
    "B2B",
    "SaaS",
    "Ant Design",
    "React Hook Form",
    "Vite",
    "JWT",
    "React Router",
    "Solana",
    "GraphQL",
    "Socket.IO",
    "Redux",
    "SCSS",
    "Phantom Wallet",
    "Crypto",
    "Gambling",
    "Real-time",
];

const PROJECT_CATEGORIES = ["Web App / Portfolio Site", "Web App", "Web App (Admin Dashboard)"];

const ARCH_COMPONENTS = [
    "Astro pages",
    "React components",
    "CSS Modules",
    "PostCSS",
    "Zustand store",
    "Embla Carousel",
    "IntersectionObserver scroll reveal",
    "Strapi 5",
    "SQLite",
    "REST API",
    "TypeScript content types",
    "pnpm workspaces",
    "Husky",
    "lint-staged",
    "GitHub Actions",
    "OIDC role assumption",
    "AWS CLI",
    "AWS S3",
    "AWS CloudFront",
    "AWS Route 53",
    "pages/",
    "middleware.ts",
    "serverSideFetch",
    "src/features/{auth,bi,event,groups,marketplace,post,rse,team,user,...}",
    "src/components/",
    "src/styled-components/",
    "src/lib/",
    "src/mocks/",
    "Layout (Sidebar + Header)",
    "Shared components",
    "Feature UI modules",
    "Ant Design ConfigProvider",
    "AppRoutes",
    "ProtectedRoutes",
    "PublicRoutes",
    "GenerateCRUDRoutes",
    "AuthContext",
    "React Query (QueryClient)",
    "Axios instance",
    "Entity event hooks",
    "Auth mutations",
    "RouteConfig types",
    "19 entity configs",
    "InputChooser",
    "EntitySelector",
    "Redux Toolkit",
    "React Router",
    "SCSS",
    "Lottie",
    "react-spring",
    "Apollo Client",
    "Socket.IO Client",
    "@solana/web3.js",
    "Phantom Wallet Adapter",
    "bs58",
    "REACT_APP_BACKEND_SERVER",
    "REACT_APP_SOCKET_SERVER",
];

function buildProjects({ technologyIds, tagIds, categoryIds, archComponentIds }) {
    return [
        {
            project: {
                title: "Personal Portfolio & Engineering Blog",
                slug: "personal-portfolio-engineering-blog",
                description:
                    "A performance-first personal portfolio built with Astro 5 and React 19, showcasing case studies, an engineering blog, and a headless CMS-driven architecture designed to convert visitors into professional opportunities.",
                bullets: [
                    "Statically generated with Astro 5, deploying to AWS S3 + CloudFront for sub-200ms global delivery",
                    "Headless CMS architecture powered by Strapi 5 with build-time content updates",
                    "AI assistant section with Zustand-managed chat state, ready for live LLM integration",
                    "Accessible UX with skip-nav, ARIA labels, and reduced-motion support",
                    "Pre-commit pipeline runs full production build before changes land",
                ],
                impact:
                    "Established a production-grade public presence enabling inbound leads for full-time remote and freelance engagements.",
                liveHref: "https://eduardov.dev",
                sourceHref: "https://github.com/EduardoV-dev/Portfolio",
                isFeatured: true,
                tags: [
                    "Astro",
                    "React",
                    "TypeScript",
                    "Strapi",
                    "AWS",
                    "PostCSS",
                    "Zustand",
                    "Embla",
                    "CloudFront",
                    "S3",
                    "CI/CD",
                    "Headless CMS",
                ].map((name) => tagIds[name]),
                categories: [categoryIds["Web App / Portfolio Site"]],
            },
            detail: {
                overview:
                    "A monorepo portfolio site pairing an Astro 5 static frontend with a Strapi 5 headless CMS backend. The frontend is statically generated at build time, pulling case studies from Strapi and shipping minimal JS by default with React islands only where interactivity is required. Deployment runs on AWS S3 + CloudFront via GitHub Actions OIDC.",
                challenge:
                    "Build a content-managed portfolio with strong performance, accessibility, and CI reliability without adopting a heavyweight SSR runtime.",
                solution:
                    "Used Astro island architecture for static-first rendering, Strapi for content modeling, and strict TypeScript across UI and data contracts. Custom IntersectionObserver animation and AWS static hosting completed the stack.",
                metrics: [
                    { label: "Deploy target", value: "AWS CloudFront global CDN" },
                    { label: "Pre-commit gate", value: "Full production build required" },
                    { label: "Hydration cost", value: "Near-zero JS on most pages" },
                    { label: "CI pipeline", value: "lint + typecheck + formatcheck + build" },
                ],
                impactDetails: [
                    "Drives inbound opportunities with a high-signal engineering showcase",
                    "Keeps project content editable through CMS without source edits",
                    "Communicates system design capability beyond resume bullets",
                ],
                highlights: [
                    {
                        title: "Astro Island Architecture",
                        description:
                            "Interactive components hydrate only where needed, preserving static performance for most content.",
                        code: {
                            language: "astro",
                            snippet: "<AiAssistant client:visible />",
                        },
                    },
                    {
                        title: "OIDC Deploys",
                        description:
                            "GitHub Actions deploys to S3 + CloudFront using OIDC role assumption with no long-lived cloud credentials.",
                    },
                ],
                learnings: [
                    "Static-first architecture simplifies performance decisions",
                    "Build-time CMS integration keeps runtime simple",
                    "Pre-commit build checks catch integration issues early",
                ],
                technologies: [
                    "Astro 5",
                    "React 19",
                    "TypeScript (strict)",
                    "PostCSS + CSS Modules",
                    "Zustand 5",
                    "Embla Carousel",
                    "Strapi 5",
                    "SQLite",
                    "AWS S3",
                    "AWS CloudFront",
                    "GitHub Actions",
                    "pnpm Workspaces",
                    "ESLint + Prettier",
                    "Husky + lint-staged",
                ].map((name) => technologyIds[name]),
                architecture: {
                    description:
                        "Monorepo static frontend with CMS-backed content. Build process fetches content, outputs static pages, then ships to CDN.",
                    layers: [
                        {
                            name: "Frontend",
                            description: "Astro pages with selective React islands and scoped CSS.",
                            components: [
                                "Astro pages",
                                "React components",
                                "CSS Modules",
                                "PostCSS",
                                "Zustand store",
                                "Embla Carousel",
                                "IntersectionObserver scroll reveal",
                            ].map((name) => archComponentIds[name]),
                        },
                        {
                            name: "Content",
                            description: "Strapi CMS over SQLite with typed API models.",
                            components: ["Strapi 5", "SQLite", "REST API", "TypeScript content types"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                        {
                            name: "Delivery",
                            description: "Build and deploy pipeline to global CDN.",
                            components: [
                                "pnpm workspaces",
                                "Husky",
                                "lint-staged",
                                "GitHub Actions",
                                "OIDC role assumption",
                                "AWS CLI",
                                "AWS S3",
                                "AWS CloudFront",
                                "AWS Route 53",
                            ].map((name) => archComponentIds[name]),
                        },
                    ],
                },
            },
        },
        {
            project: {
                title: "Nexos - CCSN Member Portal",
                slug: "nexos-ccsn-member-portal",
                description:
                    "A B2B professional networking platform for the Camara de Comercio y Servicios de Nicaragua (CCSN). It connects member companies through a private network with networking, marketplace, events, and business intelligence tools.",
                bullets: [
                    "Private member network with social feed, groups, and direct networking",
                    "Event management with in-browser video meetings via WebRTC (VideoSDK)",
                    "Business intelligence module with scored diagnostics and Chart.js visuals",
                    "Marketplace for product listings and quote requests",
                    "RSE project directory for member and chamber-sponsored initiatives",
                    "Gated onboarding with admin approval before access",
                ],
                impact:
                    "Digitizes and centralizes the CCSN member experience, replacing manual processes with a self-service portal connecting hundreds of businesses.",
                isFeatured: true,
                tags: [
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Zustand",
                    "React Query",
                    "Emotion",
                    "VideoSDK",
                    "Chart.js",
                    "AWS S3",
                    "SSR",
                    "B2B",
                    "SaaS",
                ].map((name) => tagIds[name]),
                categories: [categoryIds["Web App"]],
            },
            detail: {
                overview:
                    "Nexos 2 is the second-generation member portal for CCSN, implemented as a full-featured B2B SaaS application. It provides private networking, publishing, event coordination with live video, business diagnostics, marketplace listings, and corporate social responsibility tracking, with profile management for both users and companies.",
                challenge:
                    "CCSN needed one platform to replace fragmented manual member workflows, while supporting SSR performance, modular ownership for many feature domains, secure pending/approved auth states, and real-time video without custom media infrastructure.",
                solution:
                    "Built with Next.js 12 Pages Router using getServerSideProps for initial hydration, React Query for server state, and strict feature-slice architecture for domain isolation. Edge Middleware handles account state routing before render. VideoSDK prebuilt WebRTC handles meetings. Offline development supported by axios-mock-adapter plus SSR mock resolver.",
                metrics: [
                    { label: "Feature domains", value: "16 independent slices" },
                    { label: "Offline dev mode", value: "100% API surface mocked" },
                    { label: "CI pipeline", value: "lint + format + test + build on every PR" },
                    { label: "Pre-commit", value: "Non-compliant code blocked before commit" },
                ],
                impactDetails: [
                    "Member companies self-register and onboard with no manual staff bottleneck",
                    "Integrated video events remove dependency on external conferencing tools",
                    "Diagnostic BI module provides scored business-health insights",
                    "Marketplace creates direct B2B inquiry channels inside chamber network",
                ],
                highlights: [
                    {
                        title: "Edge Middleware Route Guard",
                        description:
                            "JWT account state (pending vs approved) enforced at edge before page render, preventing protected-route flicker.",
                        code: {
                            language: "typescript",
                            snippet:
                                "if (pendingToken) return NextResponse.redirect('/revision/account');\nif (isPrivateRoute && !sessionToken) return NextResponse.redirect('/login');\nif (isPublicRoute && sessionToken) return NextResponse.redirect('/nexos/dashboard');",
                        },
                    },
                    {
                        title: "Feature-Slice Architecture",
                        description:
                            "Sixteen vertical domains isolate adapters, APIs, components, modules, stores, and routes for parallel team delivery.",
                    },
                    {
                        title: "Dual SSR + Client Hydration",
                        description:
                            "Server-side fetch initializes route state, then React Query handles client updates without duplicate loading states.",
                    },
                    {
                        title: "Zero-Infrastructure Video Meetings",
                        description:
                            "Event rooms generated from deterministic event hash and rendered with VideoSDK WebRTC prebuilt component.",
                    },
                ],
                learnings: [
                    "Feature slices reduce merge conflicts and speed onboarding",
                    "React Query + Zustand split improves state correctness",
                    "Edge middleware gives cleaner auth UX than client-side guards",
                    "Mock-first strategy removes backend dependency bottlenecks",
                ],
                technologies: [
                    "Next.js 12",
                    "React 18",
                    "TypeScript",
                    "Emotion (CSS-in-JS)",
                    "Zustand",
                    "React Query v3",
                    "React Hook Form",
                    "Axios",
                    "VideoSDK RTC Prebuilt",
                    "Chart.js + react-chartjs-2",
                    "React Quill",
                    "AWS S3",
                    "Jest + Testing Library",
                    "Storybook",
                    "ESLint + Prettier + Husky",
                    "GitHub Actions",
                ].map((name) => technologyIds[name]),
                architecture: {
                    description:
                        "Layered Next.js SSR architecture organized by vertical feature slices, with Edge Middleware for auth routing and dual SSR + client hydration for data.",
                    layers: [
                        {
                            name: "Routing and SSR",
                            description:
                                "Pages Router shells fetch initial data with getServerSideProps; edge middleware guards private and pending routes.",
                            components: ["pages/", "middleware.ts", "serverSideFetch"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                        {
                            name: "Feature Slices",
                            description:
                                "Self-contained domain modules owning APIs, state, UI, and types with no cross-feature coupling.",
                            components: ["src/features/{auth,bi,event,groups,marketplace,post,rse,team,user,...}"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                        {
                            name: "Shared UI and Design System",
                            description:
                                "Custom Emotion-based primitives and theme shared across all feature domains.",
                            components: ["src/components/", "src/styled-components/"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                        {
                            name: "Data and Infrastructure",
                            description:
                                "Axios JWT interceptor, SSR-seeded React Query, and full mock layer for offline parity.",
                            components: ["src/lib/", "src/mocks/"].map((name) => archComponentIds[name]),
                        },
                    ],
                },
            },
        },
        {
            project: {
                title: "Nexos Admin Panel",
                slug: "nexos-admin-panel",
                description:
                    "Internal administration dashboard for Nexos, a business networking platform operated by CCSN Binary in Nicaragua. Enables admins and partner allies to manage all platform data through a unified, role-gated interface.",
                bullets: [
                    "Config-driven CRUD engine serves 19 entities with no duplicated page code",
                    "Role-based access control gates routes and navigation from one source of truth",
                    "Global cross-entity search queries 8 entities in parallel with keyboard shortcut",
                    "Generic form engine supports 20+ input types including rich text, upload, selectors",
                ],
                impact:
                    "Reduced operational overhead by consolidating management of users, companies, events, products, and reports into one role-aware dashboard.",
                isFeatured: true,
                tags: [
                    "React",
                    "TypeScript",
                    "Ant Design",
                    "React Query",
                    "React Hook Form",
                    "Vite",
                    "Axios",
                    "JWT",
                    "AWS S3",
                    "React Router",
                ].map((name) => tagIds[name]),
                categories: [categoryIds["Web App (Admin Dashboard)"]],
            },
            detail: {
                overview:
                    "Nexos Admin Panel is an internal React 18 + TypeScript dashboard for CCSN Binary. It supports Admin and Ally roles across 19 configurable entities, using a feature-sliced architecture and declarative config to generate CRUD experiences without per-entity page duplication.",
                challenge:
                    "Traditional admin systems duplicate list, detail, create, and edit pages per entity. The goal was maintainable scalability as entity count grows while preserving type safety and team velocity.",
                solution:
                    "Implemented a typed RouteConfig-driven CRUD engine. Four shared pages consume table, details, and form configs at runtime. Role access enforced by ALLY_ROUTES subset of ADMIN_ROUTES for route tree and sidebar parity.",
                metrics: [
                    { label: "Entities managed", value: "19 via 4 shared page components" },
                    { label: "Form input types", value: "20+ supported" },
                    { label: "Global search scope", value: "8 entities queried in parallel" },
                    { label: "Bundle strategy", value: "All feature routes lazy-loaded" },
                ],
                impactDetails: [
                    "Teams manage full platform operations from one interface",
                    "New entities added through config + one route registration",
                    "Role boundaries protect sensitive admin-only data",
                    "Mock backend enables fully offline frontend development",
                ],
                highlights: [
                    {
                        title: "Config-Driven CRUD Engine",
                        description:
                            "Four shared components power all entities using typed route config for table, details, and form behavior.",
                        code: {
                            language: "typescript",
                            snippet:
                                "const routeConfig = {\n  'table-view': { columns, searchFilterAttribute: 'name' },\n  details: { dataToDisplay, relatedEntities: [teamsConfig] },\n  form: { items: formFields, adapter: (values) => transformToApi(values) }\n};",
                        },
                    },
                    {
                        title: "Named Lazy Import Utility",
                        description:
                            "Custom lazyImport utility enables typed lazy-loading for named exports across feature entry points.",
                    },
                    {
                        title: "Cross-Entity Global Search",
                        description:
                            "Header overlay search runs debounced parallel queries and links users straight to entity records.",
                    },
                    {
                        title: "Axios Interceptor Pipeline",
                        description:
                            "Request interceptor injects JWT, response interceptor normalizes errors and handles auto-logout on 401.",
                    },
                ],
                learnings: [
                    "Declarative config patterns scale better for data-heavy admin UX",
                    "Feature slicing and barrel exports improve ownership boundaries",
                    "Single route subset model prevents access-control drift",
                    "Global error handling in React Query reduces repeated UI code",
                ],
                technologies: [
                    "React 18",
                    "TypeScript 4.6",
                    "Ant Design 5",
                    "React Router DOM 6",
                    "React Hook Form 7",
                    "React Quill 2",
                    "React Query 3",
                    "Axios 1.3",
                    "axios-mock-adapter",
                    "Vite 2",
                    "ESLint (Airbnb) + Prettier",
                    "Husky + lint-staged",
                    "JWT / typescript-cookie",
                    "AWS S3",
                ].map((name) => technologyIds[name]),
                architecture: {
                    description:
                        "Feature-sliced architecture with config-driven page generation. Thin auth layer gates role-filtered route tree. Server state handled by React Query.",
                    layers: [
                        {
                            name: "Presentation",
                            description:
                                "Shared layout and feature modules with lazy route loading and Ant Design theming.",
                            components: [
                                "Layout (Sidebar + Header)",
                                "Shared components",
                                "Feature UI modules",
                                "Ant Design ConfigProvider",
                            ].map((name) => archComponentIds[name]),
                        },
                        {
                            name: "Routing and Access Control",
                            description:
                                "React Router useRoutes with role-filtered trees and protected/public route boundaries.",
                            components: [
                                "AppRoutes",
                                "ProtectedRoutes",
                                "PublicRoutes",
                                "GenerateCRUDRoutes",
                                "AuthContext",
                            ].map((name) => archComponentIds[name]),
                        },
                        {
                            name: "Data Fetching",
                            description:
                                "React Query for server state and Axios interceptors for auth and error normalization.",
                            components: [
                                "React Query (QueryClient)",
                                "Axios instance",
                                "Entity event hooks",
                                "Auth mutations",
                            ].map((name) => archComponentIds[name]),
                        },
                        {
                            name: "Configuration",
                            description:
                                "Typed route config is single source of truth for list, detail, and form behavior.",
                            components: ["RouteConfig types", "19 entity configs", "InputChooser", "EntitySelector"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                    ],
                },
            },
        },
        {
            project: {
                title: "Duelana",
                slug: "duelana",
                description:
                    "A real-money crypto gambling platform built on Solana where players wager SOL tokens in provably fair casino-style games, including coinflip, jackpot, and multi-room blackjack with real-time gameplay.",
                bullets: [
                    "Three implemented games: Coinflip, weighted Jackpot, and multi-room Blackjack",
                    "Phantom wallet-signature authentication with no passwords",
                    "Provably fair cryptographic commitment model per round",
                    "Real-time state via Socket.IO with GraphQL hydration",
                    "SOL deposit/withdraw with lamport arithmetic to avoid float errors",
                ],
                impact:
                    "Enables trustless peer-to-peer wagering on Solana with verifiable game outcomes and no centralized credential model.",
                isFeatured: true,
                tags: [
                    "React",
                    "TypeScript",
                    "Solana",
                    "GraphQL",
                    "Socket.IO",
                    "Redux",
                    "SCSS",
                    "Phantom Wallet",
                    "Crypto",
                    "Gambling",
                    "Real-time",
                ].map((name) => tagIds[name]),
                categories: [categoryIds["Web App"]],
            },
            detail: {
                overview:
                    "Duelana is a browser-based crypto casino for Solana users. Players authenticate with Phantom wallet, deposit SOL converted to internal chips, and play across three games. Fairness uses cryptographic commitments verifiable after each round. Frontend runs as React SPA with GraphQL bootstrap and Socket.IO live updates into Redux.",
                challenge:
                    "Deliver trust-sensitive real-money gameplay with verifiable fairness, wallet-native auth, resilient real-time UX, and precise blockchain denomination handling.",
                solution:
                    "Implemented ticket-hash provably-fair commitments, Phantom signature auth issuing JWT, dual data pipeline (Apollo + Socket.IO), and lamport-only internal arithmetic with display-boundary conversion.",
                metrics: [
                    { label: "Games", value: "3 (Coinflip, Jackpot, Blackjack)" },
                    { label: "Blackjack rooms", value: "6 themed tables" },
                    { label: "Jackpot tiers", value: "2 (low/high)" },
                    { label: "Withdrawal fee", value: "15% platform fee" },
                ],
                impactDetails: [
                    "Players independently verify outcomes via provably fair ticket system",
                    "Referral parameters in blackjack support organic growth loops",
                    "Experience and level mechanics improve retention",
                    "Wallet-signature auth removes email/password onboarding friction",
                ],
                highlights: [
                    {
                        title: "Provably Fair Gambling",
                        description:
                            "Each round commits ticket_hash before resolution and exposes verification path after completion.",
                    },
                    {
                        title: "Blackjack Spatial Seating Engine",
                        description:
                            "Seat positions adapt for 2-7 players with full client-side card scoring and ace handling.",
                        code: {
                            language: "typescript",
                            snippet:
                                "function calculateBlackjackCardsPoints(cards: string[]): number {\n  let total = 0, aces = 0;\n  for (const card of cards) {\n    const val = getCardValue(card);\n    if (val === 11) aces++;\n    total += val;\n  }\n  while (total > 21 && aces > 0) { total -= 10; aces--; }\n  return total;\n}",
                        },
                    },
                    {
                        title: "Dual-Source Real-Time State",
                        description:
                            "Apollo loads initial snapshot, Socket.IO streams incremental updates into Redux slices.",
                    },
                    {
                        title: "Mock Dev Infrastructure",
                        description:
                            "Mock Apollo link and mock socket paths allow full frontend work without backend availability.",
                    },
                ],
                learnings: [
                    "Lamport-only arithmetic avoids subtle floating-point wager bugs",
                    "Wallet signature auth needs strict JWT lifecycle design",
                    "Dual source pipelines require explicit reconciliation strategy",
                    "Provably fair mechanics are cheaper to design early than retrofit",
                ],
                technologies: [
                    "React 17",
                    "TypeScript 4.4",
                    "Redux Toolkit",
                    "React Router v6",
                    "SASS/SCSS Modules",
                    "Lottie / react-spring",
                    "Apollo Client 3",
                    "GraphQL",
                    "Axios",
                    "Socket.IO Client v4",
                    "@solana/web3.js",
                    "Phantom Wallet Adapter",
                    "CRACO",
                    "ESLint (Airbnb) + Prettier",
                ].map((name) => technologyIds[name]),
                architecture: {
                    description:
                        "React SPA connected to external GraphQL + Socket.IO backend, with Solana blockchain interaction handled client-side through wallet adapter and web3.js.",
                    layers: [
                        {
                            name: "Frontend",
                            description: "Game UI, routing, animations, and state orchestration.",
                            components: [
                                "React components",
                                "Redux Toolkit",
                                "React Router",
                                "SCSS",
                                "Lottie",
                                "react-spring",
                            ].map((name) => archComponentIds[name]),
                        },
                        {
                            name: "Data and API",
                            description: "Persistent data via GraphQL and real-time events via WebSockets.",
                            components: ["Apollo Client", "Socket.IO Client", "Axios instance"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                        {
                            name: "Blockchain",
                            description:
                                "Client-side transaction construction, wallet auth signing, and SOL denomination handling.",
                            components: ["@solana/web3.js", "Phantom Wallet Adapter", "bs58"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                        {
                            name: "Backend (external)",
                            description:
                                "External GraphQL + Socket.IO service configured by environment variables.",
                            components: ["REACT_APP_BACKEND_SERVER", "REACT_APP_SOCKET_SERVER"].map(
                                (name) => archComponentIds[name],
                            ),
                        },
                    ],
                },
            },
        },
    ];
}

async function seed() {
    console.log("Authenticating admin...");
    const adminJwt = await getAdminJwt();
    const token = await getOrCreateApiToken(adminJwt);

    console.log("Seeding technology categories...");
    const techCategoryIds = {};
    for (const name of TECH_CATEGORIES) {
        techCategoryIds[name] = await findOrCreate("technology-categories", "name", { name }, token);
    }

    console.log("Seeding technologies...");
    const technologyIds = {};
    for (const { name, category } of TECHNOLOGIES) {
        const categoryId = techCategoryIds[category];
        if (!categoryId) {
            throw new Error(`Missing technology category id for: ${category}`);
        }
        technologyIds[name] = await findOrCreate(
            "technologies",
            "name",
            { name, category: categoryId },
            token,
        );
    }

    console.log("Seeding tags...");
    const tagIds = {};
    for (const name of TAGS) {
        tagIds[name] = await findOrCreate("tags", "name", { name }, token);
    }

    console.log("Seeding project categories...");
    const categoryIds = {};
    for (const name of PROJECT_CATEGORIES) {
        categoryIds[name] = await findOrCreate("project-categories", "name", { name }, token);
    }

    console.log("Seeding architecture components...");
    const archComponentIds = {};
    for (const name of ARCH_COMPONENTS) {
        archComponentIds[name] = await findOrCreate(
            "architecture-components",
            "name",
            { name },
            token,
        );
    }

    const mediaIds = await getMediaIds(token);
    if (mediaIds.length === 0) {
        throw new Error(
            "No Media Library files found. Upload at least one image in Strapi first (required by project.images).",
        );
    }

    const projects = buildProjects({ technologyIds, tagIds, categoryIds, archComponentIds });

    for (const { project, detail } of projects) {
        console.log(`Seeding project: ${project.title}`);
        const existingProject = await findProjectBySlug(project.slug, token);
        if (existingProject) {
            console.log(`  exists -> skip (${existingProject.id})`);
            continue;
        }

        const detailRes = await request("/api/project-details", {
            method: "POST",
            token,
            body: { data: detail },
        });
        const detailId = detailRes.data.id;
        const projectRes = await request("/api/projects?status=published", {
            method: "POST",
            token,
            body: {
                data: {
                    ...project,
                    detail: detailId,
                    images: [mediaIds[0]],
                },
            },
        });

        console.log(`  created -> ${projectRes.data.id}`);
    }

    console.log("Seed complete.");
}

seed().catch((err) => {
    console.error("Seed failed:", err.message);
    process.exit(1);
});
