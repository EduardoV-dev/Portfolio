import React from 'react';
import { Download } from '../../../icons';
import { Button, Container, Paragraph } from '../../../components';
import styles from './right.module.scss';

const AboutRight: React.FC<{}> = (): JSX.Element => {
    return (
        <Container containerType="container" transparent="true">
            <Paragraph className={styles.container__about}>
                Web developer with extensive knowledge, working with web
                technologies and UI/UX Design in order to deliver quality work.
            </Paragraph>

            <Paragraph className={styles.container__about}>
                New revamped version for my portfolio is coming soon!
            </Paragraph>
            <div>
                <Button
                    type="link"
                    color="primary"
                    icon={Download}
                    text="Download resume"
                    className={styles.container__btn}
                    href="/Resume.pdf"
                    download
                />
            </div>
        </Container>
    );
};

export default AboutRight;
