import React from 'react';
import { Base } from '../../components/ui';
import ServicesLeft from './Left';
import styles from './services.module.scss';

const Services: React.FC<{}> = (): JSX.Element => {
  const placeholder = { text: 'My Services', className: styles.placeholder };

  return (
    <Base
      leftContent={ServicesLeft}
      order="odd"
      rightContent={() => <></>}
      title="Services"
      subtitle="I solve problems with clean and scalable solutions"
      placeholder={placeholder}
      id="Services"
    />
  );
}

export default Services;