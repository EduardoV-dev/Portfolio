import React, { useContext } from 'react';
import { Download } from '../../../icons';
import { Button, Container } from '../../../ui';
import { manageUIStyle } from '../../../../helpers';
import { appContext } from '../../../../hooks/context/AppContext';
import styles from './right.module.scss';
import cn from 'classnames';

const AboutRight: React.FC<{}> = (): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const aboutClassNames = cn(styles.container__about, {
    [styles[`container__about-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <Container
      containerType="container"
      transparent="true"
    >
      <p className={aboutClassNames}>
        Web developer with extensive knowledge, working with web technologies and UI/UX Design in order to deliver quality work.
      </p>
      <Button
        type="button"
        color="primary"
        icon={Download}
        text="Download CV"
      />
    </Container>
  );
}

export default AboutRight;