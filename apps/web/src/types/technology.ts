interface TechnologyCategory extends StrapiEntity {
    name: string;
}

export interface Technology extends StrapiEntity {
    name: string;
    category: TechnologyCategory;
}
