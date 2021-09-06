import React from 'react';
import { Menu } from '../../icons';
import cn from 'classnames';
import styles from './menuToggle.module.scss';

interface IMenuToggle {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const MenuToggle: React.FC<IMenuToggle> = ({
  onClick,
  className,
}): JSX.Element => {
  const classNames = cn(styles.menuToggle, className);

  return (
    <button type="button" onClick={onClick} className={classNames}>
      <Menu />
    </button>
  );
};

export default MenuToggle;
