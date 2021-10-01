import React from 'react';
import { LayoutItem } from '../../../models/types';
import { IIcon } from '../../../models/interfaces';
import cn from 'classnames';
import styles from './Link.module.scss';
import { manageUIStyle } from '../../../helpers';

interface ILink {
  href?: string;
  text: string;
  icon: React.FC<IIcon>;
  layout: LayoutItem;
  darkMode: boolean;
  className?: string;
}

const Link: React.FC<ILink> = ({
  href,
  text,
  icon: Icon,
  layout,
  darkMode: darkmode,
  className,
}): JSX.Element => {
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
