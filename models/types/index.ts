import { types } from '../../hooks/reducer/types';
import { IProject } from '../interfaces';

export type AppAction =
  | { type: 'testing' }
  | { type: types.TOGGLEUIMODE, payload: boolean }
  | { type: types.LOADPROJECTS; payload: IProject[] };

export type LayoutItem = 'header' | 'footer';

export type Technologies = 'html' | 'css' | 'javascript' |
                           'git' | 'sass' | 'bootstrap' | 
                           'react' | 'firebase' | 'redux' |
                           'electron' | 'typescript' | 'strapi' | 
                           'next';