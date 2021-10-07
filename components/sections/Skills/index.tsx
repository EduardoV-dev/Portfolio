import React from 'react';
import { Base } from '../../ui';
import SkillsLeft from './Left';
import SkillsRight from './Right';
import styles from './skills.module.scss';

const Skills: React.FC<{}> = (): JSX.Element => {
  const placeholder = { text: 'Skills', className: styles.placeholder };

  return (
    <Base
      leftContent={SkillsLeft}
      rightContent={SkillsRight}
      order="pair"
      title="Skills"
      subtitle="Technologies I work with"
      placeholder={placeholder}
      id="Skills"
    />
  );
}

export default Skills;