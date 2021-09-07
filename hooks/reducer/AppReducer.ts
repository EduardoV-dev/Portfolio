import { AppAction } from '../../models/types';
import { initialState } from '../context/AppContext';
import { types } from './types';

const AppReducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case types.TOGGLEUIMODE:
      return {
        ...state,
        darkMode: state.darkMode ? false : true,
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
