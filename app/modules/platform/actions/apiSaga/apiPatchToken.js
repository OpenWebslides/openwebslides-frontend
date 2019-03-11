// @flow

import * as a from '../../actionTypes';

const apiPatchToken = (
  email: string,
  refreshToken: string,
): a.ApiPatchToken => {
  return {
    type: a.API_PATCH_TOKEN,
    payload: {
      email,
      refreshToken,
    },
  };
};

export default apiPatchToken;
