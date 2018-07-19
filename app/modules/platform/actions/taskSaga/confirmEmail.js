// @flow

import * as t from '../../actionTypes';

const confirmEmail = (email: string): t.ConfirmEmailAction => {
  return {
    type: t.CONFIRM_EMAIL,
    payload: {
      email,
    },
  };
};

export default confirmEmail;
