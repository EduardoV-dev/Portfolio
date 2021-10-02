import React, { useContext } from 'react';
import { LayoutItem } from '../../../models/types';
import { IIcon } from '../../../models/interfaces';
import cn from 'classnames';
import styles from './Link.module.scss';
import { manageUIStyle } from '../../../helpers';
import { appContext } from '../../../hooks/context/AppContext';

interface ILink {
  href?: string;
  text: string;
  icon: React.FC<IIcon>;
  layout: LayoutItem;
  className?: string;
}

const Link: React.FC<ILink> = ({
  href,
  text,
  icon: Icon,
  layout,
  className,
}): JSX.Element => {
  const { state: { darkMode:darkmode } } = useContext(appContext);

  const linkClassNames = cn(styles.link, className);
  const iconClassNames = cn(styles.link__icon, {
    [styles[`link__icon-${layout}`]]: layout,
  });
  const textClassNames = cn(styles.link__text, {
    [styles[`link__text-${manageUIStyle(darkmode)}`]]: manageUIStyle(darkmode),
    [styles[`link__text-${layout}`]]: layout,
  });

  return (
    <a
      href={href}
      className={linkClassNames}
    >
      <Icon
        className={iconClassNames}
        darkmode={darkmode ? 'true' : 'false'}
      />
      <span
        className={textClassNames}
      >
        {text}
      </span>
    </a>
  );
};

export default Link;
