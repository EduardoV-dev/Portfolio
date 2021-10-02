import React, { useContext } from 'react';
import { Container, Link } from '../../ui';
import { About, Contact, Home, Portfolio, Services, Skills } from '../../icons';
import { LayoutItem } from '../../../models/types';
import styles from './navbar.module.scss';
import cn from 'classnames';
import { appContext } from '../../../hooks/context/AppContext';

interface INavbar {
  menuState: boolean;
  layout: LayoutItem;
  className?: string;
}

const Navbar: React.FC<INavbar> = ({
  menuState,
  layout,
  className,
}): JSX.Element => {
  const classNames = cn(styles.navbar, className, {
    [styles[`navbar-${menuState}`]]: menuState,
  });

  return (
    <Container
      containerType="navbar"
      className={classNames}
    >
      <Link
        href="#Home"
        text="Home"
        icon={Home}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        href="#AboutMe"
        text="About Me"
        icon={About}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        href="#Skills"
        text="Skills"
        icon={Skills}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        href="#Services"
        text="Services"
        icon={Services}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
        href="#Portfolio"
        text="Portfolio"
        icon={Portfolio}
        layout={layout}
        className={styles.navbar__link}
      />
      <Link
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
