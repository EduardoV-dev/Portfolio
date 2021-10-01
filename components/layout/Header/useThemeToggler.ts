import { useEffect, useContext } from "react";
import { manageBodyStyle } from "../../../helpers";
import { appContext } from "../../../hooks/context/AppContext";
import { types } from "../../../hooks/reducer/types";

const useThemeToggler = () => {
  const {
    state: { darkMode },
    dispatch,
  } = useContext(appContext);

  const handleToggleDarkMode = () =>
    dispatch({ type: types.TOGGLEUIMODE, payload: !darkMode });

  useEffect(() => {
    manageBodyStyle(darkMode);
    localStorage.setItem('darkmode', darkMode.toString());
  }, [darkMode]);

  return {
    darkMode,
    handleToggleDarkMode,
  }
};

export default useThemeToggler;