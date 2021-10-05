import React from 'react';
import { Container, Paragraph } from '../../../ui';
import SkillsList from '../List';

const SkillsRight: React.FC<{}> = (): JSX.Element => {
  return ( 
    <Container
      containerType="container"
      transparent="true"
    >
      <Paragraph textAlign="center">
        UI/UX Design
      </Paragraph>
      <SkillsList elements='design' />
    </Container>
  );
}

export default SkillsRight;