import React from 'react';
import { Container, Paragraph } from '../../../ui';
import SkillsList from '../List';

const SkillsLeft: React.FC<{}> = (): JSX.Element => {
  return (
    <Container
      containerType="container"
      transparent="true"
    >
      <Paragraph textAlign="center">
        Web development
      </Paragraph>
      <SkillsList elements="web" />
    </Container>
  );
}

export default SkillsLeft;