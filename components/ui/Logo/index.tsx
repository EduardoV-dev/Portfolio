import React, { useContext } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import styles from './logo.module.scss';
import { manageUIStyle } from '../../../helpers';
import { appContext } from '../../../hooks/context/AppContext';

interface ILogo {
  className?: string;
}

const Logo: React.FC<ILogo> = ({ className }): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const logoClassNames = cn(styles.logo, className);
  const textClassNames = cn(styles.logo__text, {
    [styles[`logo__text-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <a href="#Home" className={logoClassNames}>
      <Image
        src="/images/logo.png"
        alt="Front end Developer"
        width={64}
        height={64}
        objectFit="cover"
        layout="fixed"
      />
      <span className={textClassNames}>
        Eduardo Varela
      </span>
    </a>
  );
};

export default Logo;
