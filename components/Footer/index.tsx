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
      <div className={styles.footer__wrapper}>
        <section className={styles.footer__content}>
          <div className={styles.footer__info}>
            <Logo className={styles.footer__logo} />
            <Highlight>Front end Developer</Highlight>
          </div>
          <div className={styles.footer__nav}>
            <Title className={styles.footer__title} text="Sections" />
            <Navbar layout="footer" />
          </div>
        </section>
        <section>
          <Highlight>&copy; Eduardo Varela {new Date().getFullYear()}, All Rights Reserved.</Highlight>
        </section>
      </div>
    </Container>
  );
}

export default Footer;