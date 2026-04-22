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

export const footerCapabilitiesLinks: Route[] = [
    { label: "Backend Engineering", href: "/about#capabilities" },
    { label: "System Architecture", href: "/architecture" },
    { label: "Cloud Infrastructure", href: "/about#capabilities" },
    { label: "Frontend & UI", href: "/about#capabilities" },
    { label: "Tech Stack", href: "/about#tech-stack" },
];

export const footerConnectLinks: Route[] = [
    { label: "Schedule a Call", href: "/contact" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eduardov-dev" },
    { label: "GitHub", href: "https://www.github.com/EduardoV-dev" },
    { label: "Email", href: "/contact#send-email" },
    { label: "Resume", href: "/resume" },
];
