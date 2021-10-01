import React, { createContext, useReducer } from 'react';
import { IAppContext, IAppReducer, IProject } from '../../models/interfaces';
import AppReducer from '../reducer/AppReducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const initialState: IAppReducer = {
  darkMode: false,
  projects: [],
}

export const appContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => {},
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