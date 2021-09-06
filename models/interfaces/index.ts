import { UIMode } from '../../consts';
import { UIType } from '../types';

export interface IProject {
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  urlToProduction: string;
  urlToSourceCode: string;
}

export interface IAppReducer {
  uiMode: UIType;
  projects: IProject[];
}

export interface IIcon {
  className: string; 
  uiMode: UIMode.DARK | UIMode.LIGHT;
}
