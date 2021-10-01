import { AppAction } from '../types';

export interface IProject {
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  urlToProduction: string;
  urlToSourceCode: string;
}

export interface IAppContext {
  state: IAppReducer;
  dispatch: React.Dispatch<AppAction>;
}

export interface IAppReducer {
  darkMode: boolean;
  projects: IProject[];
}

export interface IIcon {
  className: string; 
  darkmode: 'true' | 'false';
}

export interface ISvg extends React.SVGProps<SVGSVGElement> {
  darkmode: 'true' | 'false';
}

export interface IDarkMode {
  darkMode: boolean;
}