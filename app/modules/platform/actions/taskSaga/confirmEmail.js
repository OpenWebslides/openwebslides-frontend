// @flow

import * as t from '../../actionTypes';

const confirmEmail = (confirmationToken: string): t.ConfirmEmailAction => {
  return {
    type: t.CONFIRM_EMAIL,
    payload: {
      confirmationToken,
    },
  };
};

export default confirmEmail;

