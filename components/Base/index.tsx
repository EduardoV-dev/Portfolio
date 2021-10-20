import React, { useContext, useMemo } from 'react';
import { Container, Placeholder, Subtitle, Title } from '..';
import styles from './base.module.scss';
import cn from 'classnames';
import { appContext } from '../../hooks/context/AppContext';

interface IBase {
  order: 'pair' | 'odd';
  id: string;
  leftContent?: React.FC;
  rightContent?: React.FC;
  centralContent?: React.FC;
  placeholder?: { text: string, className?: string };
  title?: string;
  subtitle?: string;
  noAos?: 'true';
}

const Base: React.FC<IBase> = ({
  order,
  id,
  leftContent: LeftContent,
  rightContent: RightContent,
  centralContent: CentralContent,
  placeholder,
  title,
  subtitle,
  noAos,
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const noHeadlines = useMemo(() => title === undefined && subtitle === undefined, [title, subtitle]);
  const isCentralContent = useMemo(() => CentralContent !== undefined, [CentralContent]);
  const isSideContent = useMemo(() => LeftContent !== undefined && RightContent !== undefined, [LeftContent, RightContent]);

  const baseClassNames = cn(styles.base, {
    [styles[`base-noHeadlines`]]: noHeadlines,
  });
  const mainClassNames = cn(styles.base__main, {
    [styles[`base__main-sideContent`]]: isSideContent,
    [styles[`base__main-centralContent`]]: isCentralContent,
  });
  const placeholderClassNames = cn(styles.base__placeholder, placeholder?.className);

  return (
    <Container
      containerType='container'
      id={id}
      order={order}
      className={baseClassNames}
    >
      <>
        {(title && subtitle) && (
          <div className={styles.base__headlines}>
            <Title text={title} aos='zoom-in-down' />
            <Subtitle text={subtitle} aos='zoom-in-up' />
          </div>
        )}
      </>
      <div className={mainClassNames}>
        {
          (LeftContent && RightContent) &&
          (
            <>
              <div data-aos={noAos ? "" : "fade-right"}>
                <LeftContent />
              </div >
              <div data-aos={noAos ? "" : "fade-left"}>
                <RightContent />
              </div>
            </>
          )
        }
        {
          CentralContent && (
            <div data-aos="fade-up">
              <CentralContent />
            </div>
          )
        }
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