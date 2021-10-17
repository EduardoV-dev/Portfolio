import React from 'react';
import styles from './placeholder.module.scss';
import cn from 'classnames';
import { manageUIStyle } from '../../helpers';

interface IPlaceholder {
  text: string;
  darkMode: boolean;
  order: 'pair' | 'odd';
  className?: string;
}

const Placeholder: React.FC<IPlaceholder> = ({
  text,
  darkMode,
  order,
  className,
}): JSX.Element => {
  const classNames = cn(styles.placeholder, className, {
    [styles[`placeholder-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
    [styles[`placeholder-${manageUIStyle(darkMode)}-${order}`]]: order,
  });

  return ( 
    <span className={classNames}>{text}</span>
  );
}

export default Placeholder;