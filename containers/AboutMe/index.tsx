import React from 'react';
import { Base } from '../../components';
import AboutLeft from './Left';
import AboutRight from './Right';

const AboutMe: React.FC<{}> = (): JSX.Element => {
  return (
    <Base
      leftContent={AboutLeft}
      rightContent={AboutRight}
      order="odd"
      id="AboutMe"
      title="About Me"
      subtitle="My introduction"
    />
  );
}

export default AboutMe;