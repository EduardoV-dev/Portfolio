export interface Tag extends StrapiEntity {
    name: string;
}

export interface Image extends StrapiEntity {
    url: string;
    alternativeText: string;
}

export interface ProjectCategory extends StrapiEntity {
    name: string;
}
