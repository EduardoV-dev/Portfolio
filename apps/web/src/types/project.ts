import type { ArchitectureLayer } from "./architecture";
import type { Technology } from "./technology";

// TODO: Move to another file
interface Tag extends StrapiEntity {
    name: string;
}

interface ProjectCategory extends StrapiEntity {
    name: string;
}

// TODO: Move to another file
interface Image extends StrapiEntity {
    url: string;
    alternativeText: string;
}

interface ProjectMetric {
    label: string;
    value: string;
}

interface ProjectHighlightCode {
    language: string;
    snippet: string;
}

interface ProjectHighlight {
    title: string;
    description: string;
    code?: ProjectHighlightCode;
}

interface ProjectArchitecture {
    description: string;
    layers: ArchitectureLayer[];
}

export interface ProjectDetail extends StrapiEntity {
    architecture: ProjectArchitecture;
    challenge: string;
    highlights: ProjectHighlight[];
    impactDetails: string[];
    learnings: string[];
    metrics: ProjectMetric[];
    overview: string;
    solution: string;
    technologies: Technology[];
}

export interface Project extends StrapiEntity {
    bullets: string[];
    category: ProjectCategory;
    description: string;
    detail: ProjectDetail;
    images: Image[];
    impact: string;
    isFeatured: boolean;
    liveHref: string | null;
    slug: string;
    sourceHref: string | null;
    tags: Tag[];
    title: string;
}
