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
import useThemeToggler from './useTheme';

const Header: React.FC<{}> = (): JSX.Element => {
  const [menuState, setMenuState] = useState<boolean>(false);
  const { handleChangeUIMode } = useThemeToggler();
  const handleMenuState = () => setMenuState(!menuState);

  return (
    <>
      <Container
        containerType="header"
        className={styles.header}
        order="odd"
      >
        <Logo
          className={styles.header__logo}
        />
        <Navbar
          layout="header"
          className={styles.header__navbar}
          {... {
            menuState,
            handleMenuState,
          }}
        />
        <div className={styles.header__actions}>
          <MenuToggler
            className={styles.header__menuToggle}
            onClick={handleMenuState}
          />
          <ThemeToggler
            className={styles.header__themeToggler}
            onClick={handleChangeUIMode}
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
