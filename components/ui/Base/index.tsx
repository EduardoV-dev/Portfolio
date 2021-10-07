import React, { useContext } from 'react';
import { Container, Placeholder, Subtitle, Title } from '..';
import styles from './base.module.scss';
import cn from 'classnames';
import { appContext } from '../../../hooks/context/AppContext';

interface IBase {
  leftContent: React.FC;
  rightContent: React.FC;
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
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);
  const placeholderClassNames = cn(styles.base__placeholder, placeholder?.className);

  return (
    <Container
      containerType='container'
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
        <LeftContent />
        <RightContent />
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