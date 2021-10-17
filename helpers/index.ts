import React from "react";
import { badgesTechnologies } from "../consts";
import { Technologies } from "../models/types";

export const manageUIStyle = (isDarkModeOn: boolean): string =>
  isDarkModeOn ? 'dark' : 'light';

export const manageSVGStyle = (isDarkModeOn: 'true' | 'false'): string =>
  isDarkModeOn === 'false' ? '#333' : '#F2F2F2';

export const manageBodyStyle = (isDarkModeOn: boolean): void => {
  const body = document.querySelector('body');
  if (body?.style) {
    if (isDarkModeOn) body.style.backgroundColor = '#373548';
    else body.style.backgroundColor = '#F2F2F2';
  }
}

export const selectTechIconById = (id: Technologies): React.FC => badgesTechnologies[id];