import React from 'react';
import { Button, FormControl } from '../../../components';
import { Email } from '../../../icons';
import styles from './central.module.scss';

const Central: React.FC<{}> = (): JSX.Element => {
  return (
    <form className={styles.form}>
      <div className={styles.form__container}>
        <div>
          <FormControl
            control="input"
            labelText="Name"
            placeholder="John Doe..."
            type="text"
          />
          <FormControl
            control="input"
            labelText="Subject"
            placeholder="Let us start working..."
            type="text"
          />
          <FormControl
            control="input"
            labelText="Email"
            placeholder="John Doe..."
            type="email"
          />
        </div>
        <div>
          <FormControl
            control="textarea"
            labelText="Message"
            placeholder="Here is my project idea..."
          />
        </div>
      </div>
      <Button
        type="submit"
        text="Send"
        icon={Email}
        color="primary"
        className={styles.form__btn}
      />
    </form>
  );
}

export default Central;