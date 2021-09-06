import { types } from '../../hooks/reducer/types';
import { IProject } from '../interfaces';

export type AppAction =
  | { type: types.TOGGLEUIMODE }
  | { type: types.LOADPROJECTS; payload: IProject[] };

export type UIType = 'light' | 'dark';
export type LayoutItem = 'header' | 'footer';
