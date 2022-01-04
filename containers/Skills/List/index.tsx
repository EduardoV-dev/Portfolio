import React, { useState } from 'react';
import { animated, useTrail } from 'react-spring';
import { designTechnologies, webDevelopmentTechnologies } from '../../../consts';
import { Waypoint } from 'react-waypoint';
import styles from './list.module.scss';

interface ISkillsList {
  elements: 'web' | 'design';
}

const SkillsList: React.FC<ISkillsList> = ({
  elements,
}): JSX.Element => {
  const [animate, setAnimate] = useState<boolean>(false);
  const skills = elements === 'web' ? webDevelopmentTechnologies : designTechnologies;
  const trail = useTrail(skills.length, {
    from: { opacity: 0, transform: 'translate(50%, 50%) scale(1.5) rotate(180deg)' },
    to: { opacity: 1, transform: 'translate(0%, 0%) scale(1) rotate(0deg)' },
    config: {
      duration: 100,
      bounce: 1,
    },
    reset: true,
  });

  return (
    <Waypoint
      onEnter={() => setAnimate(true)}
      onLeave={() => setAnimate(false)}
    >
      <div
        className={styles.container}
      >
        {animate
          && trail.map((styles, idx) => (
            <animated.div style={styles} key={idx}>
              {skills[idx]}
            </animated.div>
          ))
        }
      </div>
    </Waypoint>
  );
}

export default SkillsList;