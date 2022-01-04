import React from 'react';
import { Container } from '../../../components';
import Item from '../item';
import styles from './central.module.scss';

const Central: React.FC<{}> = (): JSX.Element => {
  return (
    <Container 
      containerType="container"
      className={styles.container}
    >
      <Item />
      <Item />
      <Item />
    </Container>
  );
}

export default Central;