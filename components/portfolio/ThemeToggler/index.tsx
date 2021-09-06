import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from './themeToggler.module.scss';

const ThemeToggler: React.FC<{}> = (): JSX.Element => {
  return (
    <div className={styles.div}>
      <input type="checkbox" className={styles.checkbox} id="chk" />
      <label className={styles.label} htmlFor="chk">
        <FontAwesomeIcon icon={faSun} className={styles.faMoon} />
        <FontAwesomeIcon icon={faMoon} className={styles.faSun} />
        <div className={styles.ball}></div>
      </label>
    </div>
  );
};

export default ThemeToggler;
