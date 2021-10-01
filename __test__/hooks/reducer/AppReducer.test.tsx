import AppReducer from "../../../hooks/reducer/AppReducer";
import { types } from "../../../hooks/reducer/types";
import { IAppReducer } from "../../../models/interfaces";

describe('Tests on AppReducer', () => {
  const initialState = (darkMode: boolean, projects: []): IAppReducer => ({
    darkMode,
    projects,
  });

  it('Should return the initialState', () => {
    const { darkMode, projects } = AppReducer(initialState(false, []), { type: 'testing' });
    expect(darkMode).toBeFalsy();
    expect(projects).toEqual([]);
  });
  
  it('Should toggle darkMode', () => {
    const { darkMode, projects } = AppReducer(initialState(false, []), { type: types.TOGGLEUIMODE });
    expect(darkMode).toBeTruthy();
    expect(projects).toEqual([]);
  });

  it('Should load projects', () => {
    // Write test when building its respective component
  });
});