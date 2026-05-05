export interface Route {
    label: string;
    href: string;
    newTab?: boolean;
}

export const APP_ROUTES = Object.freeze({
    HOME: "/",
    CASE_STUDIES: {
        ROOT: "/case-studies",
        DETAIL: (slug: string) => `/case-studies/${slug}`,
    },
    ARCHITECTURE: "/architecture",
    ABOUT: "/about",
    BLOG: {
        ROOT: "/blog",
        DETAIL: (slug: string) => `/blog/${slug}`,
    },
    CONTACT: "/contact",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_OF_USE: "/terms-of-use",
});

export const HEADER_NAV_ITEMS: Route[] = [
    { label: "Case Studies", href: APP_ROUTES.CASE_STUDIES.ROOT },
    { label: "Architecture", href: APP_ROUTES.ARCHITECTURE },
    { label: "About", href: APP_ROUTES.ABOUT },
    { label: "Blog", href: APP_ROUTES.BLOG.ROOT },
];

export const FOOTER_CAPABILITIES_LINKS: Route[] = [
    { label: "Backend Engineering", href: `${APP_ROUTES.ABOUT}#capabilities` },
    { label: "System Architecture", href: APP_ROUTES.ARCHITECTURE },
    { label: "Cloud Infrastructure", href: `${APP_ROUTES.ABOUT}#capabilities` },
    { label: "Frontend & UI", href: `${APP_ROUTES.ABOUT}#capabilities` },
    { label: "Tech Stack", href: `${APP_ROUTES.ABOUT}#tech-stack` },
];

export const FOOTER_CONNECT_LINKS: Route[] = [
    { label: "Schedule a Call", href: `${APP_ROUTES.CONTACT}#book-a-call` },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eduardov-dev" },
    { label: "GitHub", href: "https://www.github.com/EduardoV-dev" },
    { label: "Email", href: `${APP_ROUTES.CONTACT}#send-email` },
    { label: "Resume", href: "/Eduardo_Varela_CV.pdf", newTab: true },
];
