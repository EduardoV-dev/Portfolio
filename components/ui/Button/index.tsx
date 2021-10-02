import React from 'react';
import styles from './button.module.scss';
import cn from 'classnames';

interface IButton {
  type: 'button' | 'submit' | 'link';
  color: 'primary' | 'secondary';
  icon: React.FC;
  text: string;
  className?: string;
  href?: string;
}

const Button: React.FC<IButton> = ({
  type,
  color,
  icon: Icon,
  text,
  className,
  href,
}): JSX.Element => {
  const classNames = cn(styles.button, className, {
    [styles[`button-${color}`]]: color,
    [styles[`button-${type}`]]: type,
  });

  return (
    <>
      {type === 'link' ? (
        <a
          href={href}
          className={classNames}
        >
          <span>{text}</span>
          <Icon />
        </a >
      ) : (
        <button
          type={type}
          className={classNames}
        >
          <span>{text}</span>
          <Icon />
        </button >
      )}
    </>
  );
}

export default Button;