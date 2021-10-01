import React from 'react';
import styles from './backdrop.module.scss';
import cn from 'classnames';

interface IBackdrop {
  state: boolean;
  setState: () => void;
}

const Backdrop: React.FC<IBackdrop> = ({
  state,
  setState,
}): JSX.Element => {
  const classNames = cn(styles.backdrop, {
    [styles[`backdrop-${state}`]]: state,
  })

  return (
    <div 
      className={classNames}
      onClick={setState}
    ></div>
  );
}

export default Backdrop;