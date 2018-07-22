// @flow

import * as a from '../../actionTypes';

const confirmEmail = (confirmationToken: string): a.ConfirmEmailAction => {
  return {
    type: a.CONFIRM_EMAIL,
    payload: {
      confirmationToken,
    },
  };
};

export default confirmEmail;

