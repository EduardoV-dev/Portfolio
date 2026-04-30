import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectArchitecture extends Struct.ComponentSchema {
  collectionName: 'components_project_architectures';
  info: {
    displayName: 'architecture';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    layers: Schema.Attribute.Component<'project.architecture-layer', true>;
  };
}

export interface ProjectArchitectureLayer extends Struct.ComponentSchema {
  collectionName: 'components_project_architecture_layers';
  info: {
    displayName: 'architecture-layer';
  };
  attributes: {
    components: Schema.Attribute.Relation<
      'oneToMany',
      'api::architecture-component.architecture-component'
    >;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectHighlight extends Struct.ComponentSchema {
  collectionName: 'components_project_highlights';
  info: {
    displayName: 'highlight';
  };
  attributes: {
    code: Schema.Attribute.Component<'project.highlight-code', false>;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectHighlightCode extends Struct.ComponentSchema {
  collectionName: 'components_project_highlight_codes';
  info: {
    displayName: 'highlight-code';
  };
  attributes: {
    language: Schema.Attribute.String & Schema.Attribute.Required;
    snippet: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProjectMetric extends Struct.ComponentSchema {
  collectionName: 'components_project_metrics';
  info: {
    displayName: 'metric';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.architecture': ProjectArchitecture;
      'project.architecture-layer': ProjectArchitectureLayer;
      'project.highlight': ProjectHighlight;
      'project.highlight-code': ProjectHighlightCode;
      'project.metric': ProjectMetric;
    }
  }
}
