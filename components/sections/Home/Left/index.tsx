import React from 'react';
import { Git, NextJS, ReactLibrary, Sass } from '../../../icons';
import { Container } from '../../../ui';
import styles from './left.module.scss';

const Left: React.FC<{}> = (): JSX.Element => {
  return (
    <Container
      containerType="container"
      className={styles.container}
      transparent="true"
    >
      <Git className={styles.container__git} />
      <NextJS className={styles.container__next} />
      <Sass className={styles.container__sass} />
      <ReactLibrary className={styles.container__react} />
    </Container>
  );
}

export default Left;