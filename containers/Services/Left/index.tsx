import React from 'react';
import {
  CodeClose,
  UIUXDesign,
} from '../../../components/icons';
import {
  Card,
  Container,
  Highlight,
  Paragraph,
} from '../../../components/ui';
import styles from './left.module.scss';

const ServicesLeft: React.FC<{}> = (): JSX.Element => {
  return (
    <Container
      containerType="container"
      transparent="true"
    >
      <Highlight>Problem solver</Highlight>
      <Card order="pair" className={styles.card}>
        <CodeClose />
        <Paragraph>Front end Developer</Paragraph>
      </Card>
      <Card order="pair">
        <UIUXDesign />
        <Paragraph>UI/UX Designer</Paragraph>
      </Card>
    </Container>
  );
}

export default ServicesLeft;