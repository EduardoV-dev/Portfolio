import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import styles from './logo.module.scss';
import { manageUIStyle } from '../../../styles/helpers';

interface ILogo {
  darkMode: boolean;
  className?: string;
}

const Logo: React.FC<ILogo> = ({ darkMode, className }): JSX.Element => {
  const logoClassNames = cn(styles.logo, className);

  const textClassNames = cn(styles.logo__text, {
    [styles[`logo__text-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <div className={logoClassNames}>
      <Image
        src="/images/logo.png"
        alt="Front end Developer"
        width={64}
        height={64}
        objectFit="cover"
        layout="fixed"
      />
      <a
        href="#Home"
        className={textClassNames}
      >
        Eduardo Varela
      </a>
    </div>
  );
};

export default Logo;
