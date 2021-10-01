import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from './themeToggler.module.scss';
import cn from 'classnames';
import { manageUIStyle } from '../../../../helpers';

interface IThemeToggler {
  darkMode: boolean;
  className?: string;
  onClick: () => void;
}

const ThemeToggler: React.FC<IThemeToggler> = ({ 
  darkMode,
  className, 
  onClick, 
}): JSX.Element => {
  const classNames = cn(styles.container, className, {
    [styles[`container-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <div className={classNames}>
      <input 
        type="checkbox" 
        className={styles.checkbox} 
        id="chk" 
        onClick={onClick}
        defaultChecked={darkMode}
      />
      <label className={styles.label} htmlFor="chk">
        <FontAwesomeIcon icon={faSun} className={styles.faMoon} />
        <FontAwesomeIcon icon={faMoon} className={styles.faSun} />
        <div className={styles.ball}></div>
      </label>
    </div>
  );
};

export default ThemeToggler;
