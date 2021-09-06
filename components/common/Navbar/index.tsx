import React from 'react';
import { Link } from '../../ui';
import { About, Contact, Home, Portfolio, Services, Skills } from '../../icons';
import { UIMode } from '../../../consts';
import { LayoutItem } from '../../../models/types';
import styles from './navbar.module.scss';

interface INavbar {
  layout: LayoutItem;
  uiMode: UIMode.DARK | UIMode.LIGHT;
}

const Navbar: React.FC<INavbar> = ({ layout, uiMode }): JSX.Element => {
  return (
    <nav className={styles.navbar}>
        <Link
          uiMode={uiMode}
          href="#Home"
          text="Home"
          icon={Home}
          layout={layout}
        />
        <Link
          uiMode={uiMode}
          href="#AboutMe"
          text="About Me"
          icon={About}
          layout={layout}
        />
        <Link
          uiMode={uiMode}
          href="#Skills"
          text="Skills"
          icon={Skills}
          layout={layout}
        />
        <Link
          uiMode={uiMode}
          href="#Services"
          text="Services"
          icon={Services}
          layout={layout}
        />
        <Link
          uiMode={uiMode}
          href="#Portfolio"
          text="Portfolio"
          icon={Portfolio}
          layout={layout}
        />
        <Link
          uiMode={uiMode}
          href="#ContactMe"
          text="Contact Me"
          icon={Contact}
          layout={layout}
        />
    </nav>
  );
};

export default Navbar;
