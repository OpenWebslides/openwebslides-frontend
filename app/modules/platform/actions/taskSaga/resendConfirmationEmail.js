// @flow

import * as a from '../../actionTypes';

const resendConfirmationEmail = (email: string): a.ResendConfirmationEmailAction => {
  return {
    type: a.RESEND_CONFIRMATION_EMAIL,
    payload: {
      email,
    },
  };
};

export default resendConfirmationEmail;
