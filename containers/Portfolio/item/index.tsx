import React from 'react';
import { Sass } from '../../../components/icons';
import { Card, TechBadge } from '../../../components/ui';

const Item: React.FC<{}> = (): JSX.Element => {
  return (
    <Card order="pair">
      {/* <Carousel /> */}
      <h4>Project Name</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sollicitudin et praesent erat lorem rhoncus velit. Elit pellentesque lobortis neque.
      </p>
      <h4>Technologies</h4>
      <div>
        <TechBadge TechIcon={Sass} />
      </div>
    </Card>
  );
}

export default Item;