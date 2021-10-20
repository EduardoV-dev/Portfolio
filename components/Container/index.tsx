import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './container.module.scss';
import { manageUIStyle } from '../../helpers';
import { appContext } from '../../hooks/context/AppContext';
import { useTrail } from '@react-spring/core';
import { animated } from '@react-spring/web';

interface IContainer {
  containerType: 'header' | 'footer' | 'container' | 'navbar';
  children: JSX.Element | JSX.Element[] | undefined;
  className?: string;
  order?: 'pair' | 'odd';
  id?: string;
  transparent?: 'true' | 'false';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  aos?: string;
}

const Container: React.FC<IContainer> = ({
  containerType,
  children,
  className,
  order,
  id,
  transparent,
  onClick,
  aos,
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const classNames = cn(className, {
    [styles[`container-${containerType}`]]: containerType,
    [styles[`container-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
    [styles[`container-${manageUIStyle(darkMode)}-${order}`]]: order,
    [styles[`container-${transparent}`]]: transparent,
  });

  const childrenNodes = React.Children.toArray(children);

  const trail = useTrail(childrenNodes.length, {
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 },
  });

  return (
    <>
      {containerType === 'header' && (
        <header
          className={classNames}
          id={id}
          onClick={onClick}
          data-aos={aos}
        >
          {trail.map((style, idx) => (
            <animated.div style={style} key={idx}>{[childrenNodes[idx]]}</animated.div>
          ))}
        </header>
      )}
      {containerType === 'container' && (
        <div
          className={classNames}
          id={id}
          onClick={onClick}
          data-aos={aos}
        >{children}</div>
      )}
      {containerType === 'footer' && (
        <footer
          className={classNames}
          id={id}
          onClick={onClick}
          data-aos={aos}
        >{children}</footer>
      )}
      {containerType === 'navbar' && (
        <nav
          className={classNames}
          id={id}
          onClick={onClick}
          data-aos={aos}
        >{children}</nav>
      )}
    </>
  );
};

export default Container;
