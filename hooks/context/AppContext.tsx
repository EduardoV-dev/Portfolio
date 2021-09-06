import React, { createContext, useReducer } from 'react';
import { UIMode } from '../../consts';
import { IAppReducer } from '../../models/interfaces';
import { AppAction } from '../../models/types';
import AppReducer from '../reducer/AppReducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface IContext {
  state: IAppReducer;
  dispatch: React.Dispatch<AppAction>;
}

const initialState: IAppReducer = {
  uiMode: UIMode.DARK,
  projects: [],
};

export const appContext = createContext<IContext>({
  state: initialState,
  dispatch: () => {}
});

const AppContext: React.FC<Props> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
