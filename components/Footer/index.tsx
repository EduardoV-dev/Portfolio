import React from 'react';
import { Container, Highlight, Logo, Navbar, Title } from '..';
import styles from './footer.module.scss';

const Footer: React.FC<{}> = (): JSX.Element => {
  return (
    <Container
      containerType="footer"
      order="pair"
      className={styles.footer}
    >
      <section>
        <div>
          <Logo />
          <Highlight>Front end Developer</Highlight>
        </div>
        <div>
          <Title className={styles.footer__title} text="Sections" />
          <Navbar
            layout="footer"
            handleMenuState={() => { }}
            menuState={false}
          />
        </div>
      </section>
      <section>
        <Highlight>&copy; Eduardo Varela {new Date().getFullYear()}, All Rights Reserved.</Highlight>
      </section>
    </Container>
  );
}

export default Footer;