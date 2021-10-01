import React from 'react';
import styles from './button.module.scss';
import cn from 'classnames';

interface IButton {
  type: 'button' | 'submit';
  color: 'primary' | 'secondary';
  icon: React.FC;
  text: string;
  className?: string;
}

const Button: React.FC<IButton> = ({
  type,
  color,
  icon: Icon,
  text,
  className,
}): JSX.Element => {
  const classNames = cn(styles.button, className, {
    [styles[`button-${color}`]]: color,
  });

  return ( 
    <button
      type={type}
      className={classNames}
    >
      <span>{text}</span>
      <Icon />
    </button>
  );
}

export default Button;