import React, { useContext } from 'react';
import styles from './card.module.scss';
import cn from 'classnames';
import { appContext } from '../../../hooks/context/AppContext';
import { manageUIStyle } from '../../../helpers';

interface ICard {
  children: JSX.Element | JSX.Element[];
  className?: string;
  order: 'pair' | 'odd';
}

const Card: React.FC<ICard> = ({
  className,
  children,
  order,
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const classNames = cn(styles.card, className, {
    [styles[`card-${manageUIStyle(darkMode)}`]]: darkMode,
    [styles[`card-${manageUIStyle(darkMode)}-${order}`]]: order,
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}

export default Card;