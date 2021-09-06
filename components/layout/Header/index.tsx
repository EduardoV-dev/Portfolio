import React, { useContext } from 'react';
import { Logo, Navbar } from '../../common';
import { appContext } from '../../../hooks/context/AppContext';
import { ThemeToggler } from '../../portfolio';
import { Container } from '../../ui';
import styles from './header.module.scss';

const Header: React.FC<{}> = (): JSX.Element => {
  const {
    state: { uiMode },
  } = useContext(appContext);
  return (
    <Container containerType="header" uiMode={uiMode} className={styles.header}>
      <Logo uiMode={uiMode} />
      <Navbar layout="header" uiMode={uiMode} />
      <ThemeToggler />
    </Container>
  );
};

export default Header;
