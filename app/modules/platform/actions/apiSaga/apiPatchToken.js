// @flow

import * as a from '../../actionTypes';

const apiPatchToken = (
  refreshToken: string,
): a.ApiPatchToken => {
  return {
    type: a.API_PATCH_TOKEN,
    payload: {
      refreshToken,
    },
  };
};

export default apiPatchToken;
