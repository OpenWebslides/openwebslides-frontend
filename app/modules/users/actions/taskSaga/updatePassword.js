// @flow

import * as a from '../../actionTypes';

const updatePassword = (
  id: string,
  currentPassword: string,
  password: string,
): a.UpdatePasswordAction => {
  return {
    type: a.UPDATE_PASSWORD,
    payload: {
      id,
      currentPassword,
      password,
    },
  };
};

export default updatePassword;
