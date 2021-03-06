import React, { useContext } from 'react';
import { manageUIStyle } from '../../helpers';
import { appContext } from '../../hooks/context/AppContext';
import styles from './formcontrol.module.scss';
import cn from 'classnames';

interface IFormControl {
  control: 'input' | 'textarea';
  labelText: string;
  placeholder: string;
  name?: string;
  type?: 'text' | 'email';
  className?: string;
}

const FormControl: React.FC<IFormControl> = ({
  control,
  labelText,
  type,
  className,
  ...rest
}): JSX.Element => {
  const {
    state: { darkMode },
  } = useContext(appContext);

  const containerClassNames = cn(styles.container, className);
  const labelClassNames = cn(styles.container__label, {
    [styles[`container__label-${manageUIStyle(darkMode)}`]]:
      manageUIStyle(darkMode),
  });
  const controlClassNames = cn(styles.container__control, {
    [styles[`container__control-${manageUIStyle(darkMode)}`]]:
      manageUIStyle(darkMode),
  });

  return (
    <div className={containerClassNames}>
      <label htmlFor={labelText} className={labelClassNames}>
        {labelText}
      </label>
      {control === 'input' && (
        <input
          {...{
            type,
            ...rest,
          }}
          id={labelText}
          className={controlClassNames}
        />
      )}
      {control === 'textarea' && (
        <textarea
          {...rest}
          id={labelText}
          className={`${controlClassNames} ${styles.container__control_textarea}`}
        ></textarea>
      )}
    </div>
  );
};

export default FormControl;
