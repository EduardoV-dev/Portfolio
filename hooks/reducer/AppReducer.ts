import { UIMode } from '../../consts';
import { IAppContext, IProject } from '../../Models/Interfaces';
import { types } from './types';

const AppReducer = (state: IAppContext = initialState, action: AppAction) => {
  switch (action.type) {
    case types.TOGGLEUIMODE:
      return {
        ...state,
        uiMode: state.uiMode === UIMode.LIGHT ? UIMode.DARK : UIMode.LIGHT,
      };
    case types.LOADPROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
