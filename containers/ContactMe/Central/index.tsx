import React from 'react';
import { Button, FormControl } from '../../../components';
import { Email } from '../../../icons';
import styles from './central.module.scss';
import useContact from './useContact';

const Central: React.FC<{}> = (): JSX.Element => {
  const hook = useContact();

  return (
    <form className={styles.form} onSubmit={hook?.sendEmail}>
      <div className={styles.form__container}>
        <div>
          <FormControl
            control="input"
            labelText="Name"
            placeholder="John Doe..."
            type="text"
            name="nme"
          />
          <FormControl
            control="input"
            labelText="Subject"
            placeholder="Let us start working..."
            type="text"
            name="subject"
          />
          <FormControl
            control="input"
            labelText="Email"
            placeholder="John Doe..."
            type="email"
            name="email"
          />
        </div>
        <div>
          <FormControl
            control="textarea"
            labelText="Message"
            placeholder="Here is my project idea..."
            name="message"
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
};

export default Central;
