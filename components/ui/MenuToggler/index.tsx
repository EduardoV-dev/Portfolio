import React from 'react';
import { Menu } from '../../icons';
import cn from 'classnames';
import styles from './menuToggle.module.scss';

interface IMenuToggler {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const MenuToggler: React.FC<IMenuToggler> = ({
  onClick,
  className,
}): JSX.Element => {
  const classNames = cn(styles.menuToggle, className);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames}
    >
      <Menu />
    </button>
  );
};

export default MenuToggler;
