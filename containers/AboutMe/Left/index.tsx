import React from 'react';
import Image from 'next/image';
import { Container } from '../../../components/';
import styles from './left.module.scss';

const AboutLeft: React.FC<{}> = (): JSX.Element => {
  return ( 
    <Container
      containerType="container"
      transparent="true"
      className={styles.container}
    >
      <Image  
        src="/images/developer.jpg"
        width={300}
        height={350}
        alt="Front end Developer"
        objectFit="cover"
      />
    </Container>
  );
}

export default AboutLeft;