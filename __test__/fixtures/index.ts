import { IAppReducer } from "../../models/interfaces";

export const initialState = (darkMode: boolean, projects: []): IAppReducer => ({
  darkMode: darkMode,
  projects: projects,
});