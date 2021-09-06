import React from 'react';
import Image from 'next/image';
import styles from './logo.module.scss';
import { UIMode } from '../../../consts';
import cn from 'classnames';

interface ILogo {
  uiMode: UIMode.LIGHT | UIMode.DARK;
}

const Logo: React.FC<ILogo> = ({ uiMode = UIMode.LIGHT }): JSX.Element => {
  const classNames = cn(styles.logo__text, {
    [styles[`logo__text-${uiMode}`]]: uiMode,
  });

  return (
    <div className={styles.logo}>
      <Image
        src="/images/logo.png"
        alt="Front end Developer"
        width={64}
        height={64}
        objectFit="cover"
        layout="fixed"
      />
      <p className={classNames}>Eduardo Varela</p>
    </div>
  );
};

export default Logo;
