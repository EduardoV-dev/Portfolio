import React from 'react';
import { Base } from '../../components';
import Left from './Left';
import Right from './Right';
import styles from './home.module.scss';

const Home: React.FC<{}> = (): JSX.Element => {
  const placeholder = { text: 'Home', className: styles.placeholder };

  return (
    <Base
      leftContent={Left}
      rightContent={Right}
      order='pair'
      id='Home'
      placeholder={placeholder}
      noAos="true"
    />
  );
}

export default Home;