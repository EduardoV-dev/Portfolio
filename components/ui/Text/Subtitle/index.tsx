import React from 'react';
import styles from './subtitle.module.scss';
import cn from 'classnames';

interface ITitle {
  text: string;
  className?: string;
}

const Title: React.FC<ITitle> = ({
  text,
  className,
}): JSX.Element => {
  const classNames = cn(styles.title, className);
  
  return ( 
    <p className={classNames}>{text}</p>
  );
}

export default Title;