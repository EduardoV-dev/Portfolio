import React, { Fragment } from 'react';
import { designTechnologies, webDevelopmentTechnologies } from '../../../consts';
import { Container } from '../../../components';
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
      {skills.map((Tech, idx) => (
        <Fragment key={idx}>
          {Tech}
        </Fragment>
      ))}
    </Container>
  );
}

export default SkillsList;