import { IAppReducer } from "../../models/interfaces";

export const initialState = (darkMode: boolean, projects: []): IAppReducer => ({
  darkMode: darkMode,
  projects: projects,
});

export const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: () => '',
  removeItem: jest.fn()
};