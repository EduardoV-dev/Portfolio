import React from 'react';
import styles from './highlight.module.scss';

interface IHighlight {
  children: string | number | (string | number)[]; 
}

const Highlight: React.FC<IHighlight> = ({ children }): JSX.Element => {
  return (
    <span className={styles.highlight}>{children}</span>
  );
}

export default Highlight;