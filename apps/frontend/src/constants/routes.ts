export interface Route {
    label: string;
    href: string;
}

export const routes: Route[] = [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Architecture", href: "/architecture" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
];

export const footerMoreLinks: Route[] = [
    { label: "Uses (Tech Stack)", href: "/uses" },
    { label: "Resources", href: "/resources" },
    { label: "AI Assistant", href: "/ai" },
];

export const footerCapabilitiesLinks: Route[] = [
    { label: "Product-Focused Development", href: "/about#capabilities" },
    { label: "Scalable System Architecture", href: "/about#capabilities" },
    { label: "API & Backend Design", href: "/about#capabilities" },
    { label: "Cloud Infrastructure (AWS)", href: "/about#capabilities" },
];

export const footerConnectLinks: Route[] = [
    { label: "Schedule a Call", href: "/contact" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Email", href: "mailto:hello@eduardovarela.dev" },
    { label: "Resume", href: "/resume" },
];
