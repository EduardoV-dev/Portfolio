export const manageUIStyle = (isDarkModeOn: boolean) =>
  isDarkModeOn ? 'dark' : 'light';

export const manageSVGStyle = (isDarkModeOn: boolean) =>
  !isDarkModeOn ? '#333' : '#F2F2F2';

export const manageBodyStyle = (isDarkModeOn: boolean) => {
  const body = document.querySelector('body');
  if (body?.style) {
    if (isDarkModeOn) body.style.backgroundColor = '#373548';
    else body.style.backgroundColor = '#F2F2F2';
  }
}