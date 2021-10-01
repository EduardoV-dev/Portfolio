import React from 'react';
import styles from './placeholder.module.scss';
import cn from 'classnames';

interface IPlaceholder {
  text: string;
  className?: string;
}

const Placeholder: React.FC<IPlaceholder> = ({
  text,
  className,
}): JSX.Element => {
  const classNames = cn(styles.placeholder, className);

  return ( 
    <span className={classNames}>{text}</span>
  );
}

export default Placeholder;