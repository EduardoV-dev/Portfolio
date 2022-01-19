import { types } from '../../hooks/reducer/types';
import { IProject } from '../interfaces';

export type AppAction =
  | { type: 'testing' }
  | { type: types.TOGGLEUIMODE; payload: boolean }
  | { type: types.LOADPROJECTS; payload: IProject[] };

export type LayoutItem = 'header' | 'footer';

export type Technologies =
  | 'HTML5'
  | 'CSS3'
  | 'JavaScript'
  | 'Git'
  | 'SASS'
  | 'Bootstrap'
  | 'React'
  | 'Firebase'
  | 'Redux'
  | 'Electron'
  | 'TypeScript'
  | 'Next'
  | 'TailwindCSS';
