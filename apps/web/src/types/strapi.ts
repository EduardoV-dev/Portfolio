interface Tag extends StrapiEntity {
    name: string;
}

interface ProjectCategory extends StrapiEntity {
    name: string;
}

interface Image extends StrapiEntity {
    url: string;
    alternativeText: string;
}

export interface Project extends StrapiEntity {
    bullets: string[];
    category: ProjectCategory;
    description: string;
    images: Image[];
    impact: string;
    isFeatured: boolean;
    liveHref: string | null;
    slug: string;
    sourceHref: string | null;
    tags: Tag[];
    title: string;
}
