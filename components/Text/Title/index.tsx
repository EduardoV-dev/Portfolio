import React from 'react';
import styles from './title.module.scss';
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
    <h3 className={classNames}>{text}</h3>
  );
}

export default Title;