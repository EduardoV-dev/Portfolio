import React from 'react';
import { Button, Container, Highlight } from '../../../components';
import styles from './right.module.scss';
import { Go } from '../../../icons';
import { animated } from 'react-spring';
import useAnimationsAndClasses from './useAnimationsAndClasses';

interface IRight {
  className?: string;
}

const Right: React.FC<IRight> = ({
  className,
}): JSX.Element => {
  const {
    classNames: {
      container,
      small,
      headline,
      subtitle,
    },
    animations: {
      aniHeadline,
      aniSmall,
      aniSubtitle,
      aniButton
    }
  } = useAnimationsAndClasses(className);

  return (
    <Container
      containerType="container"
      className={container}
      transparent='true'
    >
      <animated.small style={aniSmall} className={small}>
        if <Highlight>Thinkable</Highlight>, then it's <Highlight>Codable</Highlight>
      </animated.small>
      <animated.h1 style={aniHeadline} className={headline}>
        Hello There! I am a <Highlight>Front end Developer.</Highlight><br />
        <Highlight>Passionate</Highlight> about what I do.
      </animated.h1>
      <animated.h2 style={aniSubtitle} className={subtitle}>
        Contact me so that we can start working together.
      </animated.h2>
      <Button
        type="link"
        color="secondary"
        icon={Go}
        text="Contact Me"
        className={styles.content__button}
        href="#ContactMe"
        style={aniButton}
      />
    </Container>
  );
}

export default Right;