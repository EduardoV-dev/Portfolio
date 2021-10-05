import React from 'react';
import { designTechnologies, webDevelopmentTechnologies } from '../../../../consts';
import { Container } from '../../../ui';
import styles from './list.module.scss';

interface ISkillsList {
  elements: 'web' | 'design';
}

const SkillsList: React.FC<ISkillsList> = ({
  elements,
}): JSX.Element => {
  const skills = elements === 'web' ? webDevelopmentTechnologies : designTechnologies;

  return (
    <Container
      containerType="container"
      transparent="true"
      className={styles.container}
    >
      {skills.map(Tech => (
        <>
          {Tech}
        </>
      ))}
    </Container>
  );
}

export default SkillsList;