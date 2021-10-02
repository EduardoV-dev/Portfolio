import React from 'react';
import { IDarkMode } from '../../../../models/interfaces';
import { Button, Container, Highlight } from '../../../ui';
import styles from './right.module.scss';
import cn from 'classnames';
import { manageUIStyle } from '../../../../helpers';
import { Go } from '../../../icons';

interface IRight extends IDarkMode {
  className?: string;
}

const Right: React.FC<IRight> = ({
  darkMode,
  className
}): JSX.Element => {
  const classNames = cn(styles.content, className);
  const smallClassNames = cn(styles.content__small, {
    [styles[`content__small-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });
  const headlineClassNames = cn(styles.content__headline, {
    [styles[`content__headline-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });
  const subtitleClassNames = cn(styles.content__subtitle, {
    [styles[`content__subtitle-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <Container
      containerType="container"
      darkMode={darkMode}
      className={classNames}
      transparent='true'
    >
      <small className={smallClassNames}>
        if <Highlight>Thinkable</Highlight>, then it's <Highlight>Codable</Highlight>
      </small>
      <h1 className={headlineClassNames}>
        Hello There! I am a <Highlight>Front end Developer.</Highlight><br />
        <Highlight>Passionate</Highlight> about what I do.
      </h1>
      <h2 className={subtitleClassNames}>
        Contact me so that we can start working together.
      </h2>
      <Button 
        type="link"
        color="secondary"
        icon={Go}
        text="Contact Me"
        className={styles.content__button}
        href="#ContactMe"
      />
    </Container>
  );
}

export default Right;