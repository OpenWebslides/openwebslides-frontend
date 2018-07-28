// @flow

import * as a from '../../actionTypes';

const sendResetPasswordEmail = (email: string): a.SendResetPasswordEmailAction => {
  return {
    type: a.SEND_RESET_PASSWORD_EMAIL,
    payload: {
      email,
    },
  };
};

export default sendResetPasswordEmail;
