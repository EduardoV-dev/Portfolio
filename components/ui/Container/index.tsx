import React from 'react';
import { UIMode } from '../../../consts';
import cn from 'classnames';
import styles from './container.module.scss';

interface IContainer {
  containerType: 'header' | 'footer' | 'container';
  uiMode: UIMode.DARK | UIMode.LIGHT;
  children: JSX.Element | JSX.Element[];
  className?: string;
  order?: 'pair' | 'odd';
}

const Container: React.FC<IContainer> = ({
  containerType,
  uiMode,
  children,
  className,
  order,
}): JSX.Element => {
  const classNames = cn({
    [styles[`container-${containerType}`]]: containerType,
    [styles[`container-${uiMode}`]]: uiMode,
    [styles[`container-${uiMode}-${order}`]]: order,
  });

  return (
    <>
      {containerType === 'container' && (
        <div className={`${classNames} ${className}`}>{children}</div>
      )}
      {containerType === 'header' && (
        <header className={`${classNames} ${className}`}>{children}</header>
      )}
      {containerType === 'footer' && (
        <footer className={`${classNames} ${className}`}>{children}</footer>
      )}
    </>
  );
};

export default Container;
