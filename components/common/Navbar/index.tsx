import React from 'react';
import { Container, Link } from '../../ui';
import { About, Contact, Home, Portfolio, Services, Skills } from '../../icons';
import { LayoutItem } from '../../../models/types';
import styles from './navbar.module.scss';
import cn from 'classnames';

interface INavbar {
  menuState: boolean;
  layout: LayoutItem;
  darkMode: boolean;
  className?: string;
}

const Navbar: React.FC<INavbar> = ({
  menuState,
  layout,
  darkMode,
  className,
}): JSX.Element => {
  const classNames = cn(styles.navbar, className, {
    [styles[`navbar-${menuState}`]]: menuState,
  });

  return (
    <Container
      containerType="navbar"
      darkMode={darkMode}
      className={classNames}
    >
      <Link
        darkMode={darkMode}
        href="#Home"
        text="Home"
        icon={Home}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        darkMode={darkMode}
        href="#AboutMe"
        text="About Me"
        icon={About}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        darkMode={darkMode}
        href="#Skills"
        text="Skills"
        icon={Skills}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        darkMode={darkMode}
        href="#Services"
        text="Services"
        icon={Services}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        darkMode={darkMode}
        href="#Portfolio"
        text="Portfolio"
        icon={Portfolio}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        darkMode={darkMode}
        href="#ContactMe"
        text="Contact Me"
        icon={Contact}
        layout={layout}
        className={styles.navbar__link}
      />
    </Container>
  );
};

export default Navbar;
