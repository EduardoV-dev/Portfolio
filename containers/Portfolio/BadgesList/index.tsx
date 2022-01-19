import React from 'react';
import { badgesTechnologies } from '../../../consts';
import { Technologies } from '../../../models/types';
import styles from './badgeslist.module.scss';

interface IBadgesList {
  technologies: Technologies[];
  className?: string;
}

const BadgesList: React.FC<IBadgesList> = ({
  technologies,
  className,
}): JSX.Element => {
  const badges = technologies.map((techName) => badgesTechnologies[techName]);

  return (
    <div className={className}>
      {badges.map((Badge, idx) => (
        <Badge width={32} height={32} key={idx} className={styles.badge} />
      ))}
    </div>
  );
};

export default BadgesList;
