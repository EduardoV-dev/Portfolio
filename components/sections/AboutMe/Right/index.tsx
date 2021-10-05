import React from 'react';
import { Download } from '../../../icons';
import { Button, Container, Paragraph } from '../../../ui';
import styles from './right.module.scss';

const AboutRight: React.FC<{}> = (): JSX.Element => {
  return (
    <Container
      containerType="container"
      transparent="true"
    >
      <Paragraph className={styles.container__about}>
        Web developer with extensive knowledge, working with web technologies and UI/UX Design in order to deliver quality work.
      </Paragraph>
      <Button
        type="button"
        color="primary"
        icon={Download}
        text="Download CV"
        className={styles.container__btn}
      />
    </Container>
  );
}

export default AboutRight;