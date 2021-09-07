import React, { useContext, useState } from 'react';
import { Backdrop, Logo, Navbar } from '../../common';
import { appContext } from '../../../hooks/context/AppContext';
import { ThemeToggler } from '../../portfolio';
import { Container, MenuToggler } from '../../ui';
import { types } from '../../../hooks/reducer/types';
import styles from './header.module.scss';

const Header: React.FC<{}> = (): JSX.Element => {
  const {
    state: { darkMode },
    dispatch,
  } = useContext(appContext);
  const [menuState, setMenuState] = useState<boolean>(false);

  const handleMenuState = () => setMenuState(!menuState);
  const handleToggleDarkMode = () => dispatch({ type: types.TOGGLEUIMODE });

  return (
    <>
      <Container
        containerType="header"
        darkMode={darkMode}
        className={styles.header}
      >
        <Logo
          darkMode={darkMode}
          className={styles.header__logo}
        />
        <Navbar
          menuState={menuState}
          layout="header"
          darkMode={darkMode}
          className={styles.header__navbar}
        />
        <div className={styles.header__actions}>
          <MenuToggler
            className={styles.header__menuToggle}
            onClick={handleMenuState}
          />
          <ThemeToggler
            className={styles.header__themeToggler}
            onClick={handleToggleDarkMode}
          />
        </div>
      </Container>
      <Backdrop
        state={menuState}
        setState={handleMenuState}
      />
    </>

  );
};

export default Header;
