export const manageUIStyle = (isDarkModeOn: boolean) => 
  isDarkModeOn ? 'dark' : 'light';
  
export const manageSVGStyle = (isDarkModeOn: 'true' | 'false') => 
  isDarkModeOn === 'false' ? '#333' : '#F2F2F2';