import React from 'react';
import { Base } from '../../components/ui';
import Central from './central';

const Portfolio: React.FC<{}> = (): JSX.Element => {
  return ( 
    <Base
      centralContent={Central}
      order="pair"
      id="Portfolio"
      title="Porfolio"
      subtitle="Some projects I have worked on"
    />
  );
}

export default Portfolio;