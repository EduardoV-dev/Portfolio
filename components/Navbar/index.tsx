import React from 'react';
import { Container, Link } from '..';
import {
  About,
  Contact,
  Home,
  Portfolio,
  Services,
  Skills,
} from '../../icons';
import { LayoutItem } from '../../models/types';
import styles from './navbar.module.scss';
import cn from 'classnames';

interface INavbar {
  menuState: boolean;
  handleMenuState: () => void;
  layout: LayoutItem;
  className?: string;
}

const Navbar: React.FC<INavbar> = ({
  menuState,
  handleMenuState,
  layout,
  className,
}): JSX.Element => {
  const classNames = cn(styles.navbar, className, {
    [styles[`navbar-${layout}`]]: layout,
    [styles[`navbar-${menuState}`]]: menuState,
  });

  const handleClickOnLink = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth >= 768 || !e.target) return;
    const elementTagName = (e.target as Element).tagName;
    if (elementTagName === 'DIV') return;
    handleMenuState();
  }

  return (
    <Container
      containerType="navbar"
      className={classNames}
      onClick={handleClickOnLink}
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
