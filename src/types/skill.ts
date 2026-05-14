interface SkillCategory extends StrapiEntity {
    name: string;
}

export interface Skill extends StrapiEntity {
    name: string;
    category: SkillCategory;
}
