import React from 'react';
import styles from './button.module.scss';
import cn from 'classnames';
import { animated } from 'react-spring';

interface IButton {
  type: 'button' | 'submit' | 'link';
  color: 'primary' | 'secondary';
  icon: React.FC;
  text: string;
  className?: string;
  href?: string;
  style?: any;
}

const Button: React.FC<IButton> = ({
  type,
  color,
  icon: Icon,
  text,
  className,
  href,
  style,
}): JSX.Element => {
  const classNames = cn(styles.button, className, {
    [styles[`button-${color}`]]: color,
    [styles[`button-${type}`]]: type,
  });

  return (
    <>
      {type === 'link' ? (
        <animated.a
          {...{ href, style }}
          className={classNames}
        >
          <span>{text}</span>
          <Icon />
        </animated.a>
      ) : (
        <animated.button
          {...{ type, style }}
          className={classNames}
        >
          <span>{text}</span>
          <Icon />
        </animated.button>
      )}
    </>
  );
}

export default Button;