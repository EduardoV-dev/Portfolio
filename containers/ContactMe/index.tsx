import React from 'react';
import { Base } from '../../components';
import Central from './Central';

const ContactMe: React.FC<{}> = (): JSX.Element => {
  return ( 
    <Base
      id="ContactMe"
      order="odd"
      title="Contact Me"
      subtitle="Get in touch"
      centralContent={Central}
    />
  );
}

export default ContactMe;