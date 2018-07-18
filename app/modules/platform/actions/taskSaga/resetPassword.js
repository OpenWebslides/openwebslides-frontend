// @flow

import * as t from '../../actionTypes';

const resetPassword = (email: string): t.ResetPasswordAction => {
  return {
    type: t.RESET_PASSWORD,
    payload: {
      email,
    },
  };
};

export default resetPassword;
