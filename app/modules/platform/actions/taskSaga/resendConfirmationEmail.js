// @flow

import * as t from '../../actionTypes';

const resendConfirmationEmail = (email: string): t.ResendConfirmationEmailAction => {
  return {
    type: t.RESEND_CONFIRMATION_EMAIL,
    payload: {
      email,
    },
  };
};

export default resendConfirmationEmail;
