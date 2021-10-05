import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './container.module.scss';
import { manageUIStyle } from '../../../helpers';
import { appContext } from '../../../hooks/context/AppContext';

interface IContainer {
  containerType: 'header' | 'footer' | 'container' | 'navbar';
  children: JSX.Element | JSX.Element[] | undefined;
  className?: string;
  order?: 'pair' | 'odd';
  id?: string;
  transparent?: 'true' | 'false';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Container: React.FC<IContainer> = ({
  containerType,
  children,
  className,
  order,
  id,
  transparent,
  onClick,
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const classNames = cn(className, {
    [styles[`container-${containerType}`]]: containerType,
    [styles[`container-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
    [styles[`container-${manageUIStyle(darkMode)}-${order}`]]: order,
    [styles[`container-${transparent}`]]: transparent,
  });

  return (
    <>
      {containerType === 'container' && (
        <div
          className={classNames}
          id={id}
          onClick={onClick}
        >{children}</div>
      )}
      {containerType === 'header' && (
        <header
          className={classNames}
          id={id}
          onClick={onClick}
        >{children}</header>
      )}
      {containerType === 'footer' && (
        <footer
          className={classNames}
          id={id}
          onClick={onClick}
        >{children}</footer>
      )}
      {containerType === 'navbar' && (
        <nav
          className={classNames}
          id={id}
          onClick={onClick}
        >{children}</nav>
      )}
    </>
  );
};

export default Container;
