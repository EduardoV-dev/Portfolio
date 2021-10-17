import React, { useContext } from 'react';
import styles from './paragraph.module.scss';
import cn from 'classnames';
import { manageUIStyle } from '../../../helpers';
import { appContext } from '../../../hooks/context/AppContext';

interface IParagraph {
  children: JSX.Element | string | (JSX.Element | string)[];
  className?: string;
  textAlign?: 'center';
}

const Paragraph: React.FC<IParagraph> = ({
  children,
  className,
  textAlign, 
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);
  const classNames = cn(styles.paragraph, className, {
    [styles[`paragraph-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
    [styles[`paragraph-${textAlign}`]]: textAlign,
  });

  return (
    <p className={classNames}>
      {children}
    </p>
  );
}

export default Paragraph;