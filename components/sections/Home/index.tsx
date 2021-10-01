import React from 'react';
import { Base } from '../../ui';
import Left from './Left';
import Right from './Right';
import styles from './home.module.scss';

const Home: React.FC<{ darkMode: boolean }> = ({ darkMode }): JSX.Element => {
  const placeholder = { text: 'Home', className: styles.placeholder };

  return (
    <Base
      leftContent={Left}
      rightContent={Right}
      order='pair'
      id='Home'
      placeholder={placeholder}
      darkMode={darkMode}
    />
  );
}

export default Home;