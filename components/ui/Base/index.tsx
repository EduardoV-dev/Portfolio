import React from 'react';
import { IDarkMode } from '../../../models/interfaces';
import { Container, Placeholder, Subtitle, Title } from '..';
import styles from './base.module.scss';
import cn from 'classnames';
import { manageUIStyle } from '../../../helpers';

interface IBase {
  leftContent: React.FC<IDarkMode>;
  rightContent: React.FC<IDarkMode>;
  darkMode: boolean;
  order: 'pair' | 'odd';
  placeholder?: { text: string, className?: string };
  title?: string;
  subtitle?: string;
  id?: string;
}

const Base: React.FC<IBase> = ({
  leftContent: LeftContent,
  rightContent: RightContent,
  placeholder,
  title,
  subtitle,
  id,
  order,
  darkMode,
}): JSX.Element => {
  const placeholderClassNames = cn(styles.base__placeholder, placeholder?.className);

  return (
    <Container
      containerType='container'
      darkMode={darkMode}
      id={id}
      order={order}
      className={styles.base}
    >
      <>
        {(title && subtitle) && (
          <div className={styles.base__headlines}>
            <Title text={title} />
            <Subtitle text={subtitle} />
          </div>
        )}
      </>
      <div className={styles.base__main}>
        <LeftContent darkMode={darkMode} />
        <RightContent darkMode={darkMode} />
      </div>
      <>
        {placeholder && (
          <Placeholder
            text={placeholder.text}
            className={placeholderClassNames}
            {... {
              darkMode,
              order,
            }}
          />
        )}
      </>
    </Container>
  );
}

export default Base;