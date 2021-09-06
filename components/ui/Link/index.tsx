import React from 'react';
import { UIMode } from '../../../consts';
import { LayoutItem } from '../../../models/types';
import { IIcon } from '../../../models/interfaces';
import cn from 'classnames';
import styles from './Link.module.scss';

interface ILink {
  href: string;
  text: string;
  icon: React.FC<IIcon>;
  layout: LayoutItem;
  uiMode: UIMode.DARK | UIMode.LIGHT;
}

const Link: React.FC<ILink> = ({
  href,
  text,
  icon: Icon,
  layout,
  uiMode,
}): JSX.Element => {
  const iconClassNames = cn(styles.link__icon, {
    [styles[`link__icon-${layout}`]]: layout,
  });

  const textClassNames = cn(styles.link__text, {
    [styles[`link__text-${uiMode}`]]: uiMode,
    [styles[`link__text-${layout}`]]: layout,
  });

  return (
    <a href={href} className={styles.link}>
      <Icon className={iconClassNames} uiMode={uiMode} />
      <span className={textClassNames}>{text}</span>
    </a>
  );
};

export default Link;
