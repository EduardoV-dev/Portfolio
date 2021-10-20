import React from 'react';
import { Git, NextJS, ReactLibrary, Sass } from '../../../icons';
import { animated, useTrail } from 'react-spring';
import styles from './left.module.scss';

const Left: React.FC<{}> = (): JSX.Element => {
  const Icons = [
    { icon: <Sass />, className: styles.container__sass },
    { icon: <ReactLibrary />, className: styles.container__react },
    { icon: <Git />, className: styles.container__git },
    { icon: <NextJS />, className: styles.container__next },
  ];
  const trail = useTrail(Icons.length, {
    from: { opacity: 0, transform: 'scale(1.3) translateY(-200%)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0%)' },
  });

  return (
    <div className={styles.container}>
      {trail.map((style, idx) => (
        <animated.div
          key={idx}
          className={Icons[idx].className}
          style={style}
        >
          {Icons[idx].icon}
        </animated.div>
      ))}
    </div>
  );
}

export default Left;