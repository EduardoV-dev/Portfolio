import React from 'react';
import styles from './title.module.scss';
import cn from 'classnames';

interface ITitle {
  text: string;
  className?: string;
  aos?: string;
}

const Title: React.FC<ITitle> = ({
  text,
  className,
  aos,
}): JSX.Element => {
  const classNames = cn(styles.title, className);

  return ( 
    <h3 
      className={classNames}
      data-aos={aos}
    >{text}</h3>
  );
}

export default Title;