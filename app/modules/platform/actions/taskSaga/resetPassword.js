// @flow

import * as a from '../../actionTypes';

const resetPassword = (email: string): a.ResetPasswordAction => {
  return {
    type: a.RESET_PASSWORD,
    payload: {
      email,
    },
  };
};

export default resetPassword;
