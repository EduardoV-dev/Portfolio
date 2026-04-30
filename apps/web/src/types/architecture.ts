interface ArchitectureComponent extends StrapiEntity {
    name: string;
}

export interface ArchitectureLayer {
    name: string;
    components: ArchitectureComponent[];
    description: string;
}
