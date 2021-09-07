import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from './themeToggler.module.scss';
import cn from 'classnames';

interface IThemeToggler {
  className?: string;
  onClick: () => void;
}

const ThemeToggler: React.FC<IThemeToggler> = ({ 
  className, 
  onClick, 
}): JSX.Element => {
  const classNames = cn(styles.div, className);

  return (
    <div className={classNames}>
      <input 
        type="checkbox" 
        className={styles.checkbox} 
        id="chk" 
        onClick={onClick}
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
