import React from 'react';
import { AppAction, Technologies } from '../types';

export interface IProject {
  name: string;
  description: string;
  technologies: Technologies[];
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
  darkmode: 'true' | 'false';
  className?: string; 
}

export interface ISvg extends React.SVGProps<SVGSVGElement> {
  darkmode: 'true' | 'false';
}