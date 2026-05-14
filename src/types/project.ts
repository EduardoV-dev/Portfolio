import type { ArchitectureLayer } from "./architecture";
import type { Image, ProjectCategory, Tag } from "./common";
import type { Skill } from "./skill";

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
    skills: Skill[];
}

export interface Project extends StrapiEntity {
    bullets: string[];
    category?: ProjectCategory;
    categories?: ProjectCategory[];
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
