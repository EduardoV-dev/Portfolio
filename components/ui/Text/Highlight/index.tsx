import React from 'react';
import styles from './highlight.module.scss';

const Highlight: React.FC<{ children: string }> = ({ children }): JSX.Element => {
  return (
    <span className={styles.highlight}>{children}</span>
  );
}

export default Highlight;