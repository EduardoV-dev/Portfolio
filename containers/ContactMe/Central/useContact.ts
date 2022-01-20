import React from 'react';
import { emailJS } from '../../../consts';
import { sendForm } from '@emailjs/browser';
import swal from 'sweetalert2';

const useContact = () => {
  if (!emailJS) return null;
  const { serviceId, templateId, userId } = emailJS;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    sendForm(serviceId, templateId, target, userId)
      .then(() => {
        swal.fire(
          'Message sent!',
          'I will get in touch with you as soon as possible, have a great day!',
          'success'
        );
      })
      .catch(() => {
        swal.fire(
          'Error on sending!',
          'Looks like there was an error, try again later.',
          'error'
        );
      })
      .finally(() => target.reset());
  };

  return {
    sendEmail,
  };
};

export default useContact;
