import React from 'react';
import { Base, Paragraph } from '../../components';
import SkillsLeft from './Left';
import SkillsRight from './Right';
import styles from './skills.module.scss';

const Skills: React.FC<{}> = (): JSX.Element => {
    const placeholder = { text: 'Skills', className: styles.placeholder };

    return (
        <>
            <Base
                leftContent={SkillsLeft}
                rightContent={SkillsRight}
                order="pair"
                title="Skills"
                subtitle="Technologies I work with"
                placeholder={placeholder}
                id="Skills"
            />

            <Paragraph textAlign="center" className={styles['many-more-text']}>
                And many more...
            </Paragraph>
        </>
    );
};

export default Skills;
