import { useEffect, useContext } from "react";
import { LSDARKMODE } from "../../consts";
import { manageBodyStyle } from "../../helpers";
import { appContext } from "../../hooks/context/AppContext";
import { types } from "../../hooks/reducer/types";

const useTheme = () => {
  const {
    state: { darkMode },
    dispatch,
  } = useContext(appContext);

  const handleChangeUIMode = () => {
    localStorage.setItem(LSDARKMODE, JSON.stringify({ isDarkModeOn: !darkMode }));
    dispatch({ type: types.TOGGLEUIMODE, payload: !darkMode });
  }

  useEffect(() => {
    manageBodyStyle(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const darkMode = JSON.parse(localStorage.getItem(LSDARKMODE) || '{"isDarkModeOn": false}');
    dispatch({ type: types.TOGGLEUIMODE, payload: darkMode.isDarkModeOn });
  }, []);

  return {
    handleChangeUIMode,
  }
};

export default useTheme;