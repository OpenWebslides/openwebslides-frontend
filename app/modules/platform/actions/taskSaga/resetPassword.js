// @flow

import * as a from '../../actionTypes';

const resetPassword = (password: string, resetPasswordToken: string): a.ResetPasswordAction => {
  return {
    type: a.RESET_PASSWORD,
    payload: {
      password,
      resetPasswordToken,
    },
  };
};

export default resetPassword;
