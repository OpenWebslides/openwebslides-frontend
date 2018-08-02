// @flow

import * as a from '../../actionTypes';

const apiPatchPassword = (
  password: string,
  resetPasswordToken: string,
): a.ApiPatchPasswordAction => {
  return {
    type: a.API_PATCH_PASSWORD,
    payload: {
      password,
      resetPasswordToken,
    },
  };
};

export default apiPatchPassword;
