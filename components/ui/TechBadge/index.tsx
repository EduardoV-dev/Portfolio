import React from 'react';
import styles from './techbadge.module.scss';
import cn from 'classnames';

interface ITechBadge {
  TechIcon: React.FC<{ className: string }>;
  className?: string;
}

const TechBadge: React.FC<ITechBadge> = ({
  TechIcon,
  className,
}): JSX.Element => {
  const classNames = cn(styles.badge, className);

  return (
    <TechIcon className={classNames} />
  );
}

export default TechBadge;