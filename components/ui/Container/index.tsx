import React from 'react';
import cn from 'classnames';
import styles from './container.module.scss';
import { manageUIStyle } from '../../../styles/helpers';

interface IContainer {
  containerType: 'header' | 'footer' | 'container' | 'navbar';
  darkMode: boolean;
  children: JSX.Element | JSX.Element[];
  className?: string;
  order?: 'pair' | 'odd';
}

const Container: React.FC<IContainer> = ({
  containerType,
  darkMode,
  children,
  className,
  order,
}): JSX.Element => {
  const classNames = cn({
    [styles[`container-${containerType}`]]: containerType,
    [styles[`container-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
    [styles[`container-${manageUIStyle(darkMode)}-${order}`]]: order,
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
      {containerType === 'navbar' && (
        <nav className={`${classNames} ${className}`}>{children}</nav>
      )}
    </>
  );
};

export default Container;
