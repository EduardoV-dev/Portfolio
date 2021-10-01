import React, { useState } from 'react';
import {
  Backdrop,
  Container,
  MenuToggler,
  ThemeToggler,
  Logo,
  Navbar
} from '../../ui';
import styles from './header.module.scss';
import useThemeToggler from './useThemeToggler';

const Header: React.FC<{}> = (): JSX.Element => {
  const [menuState, setMenuState] = useState<boolean>(false);
  const { darkMode, handleToggleDarkMode } = useThemeToggler();
  const handleMenuState = () => setMenuState(!menuState);

  return (
    <>
      <Container
        containerType="header"
        darkMode={darkMode}
        className={styles.header}
        order="odd"
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
            darkMode={darkMode}
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
