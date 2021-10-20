import React, { useContext } from 'react';
import styles from './subtitle.module.scss';
import cn from 'classnames';
import { appContext } from '../../../hooks/context/AppContext';
import { manageUIStyle } from '../../../helpers';

interface ISubtitle {
  text: string;
  className?: string;
  aos?: string;
}

const Subtitle: React.FC<ISubtitle> = ({
  text,
  className,
  aos,
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);
  const classNames = cn(styles.subtitle, className, {
    [styles[`subtitle-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <p data-aos={aos} className={classNames}>{text}</p>
  );
}

export default Subtitle;