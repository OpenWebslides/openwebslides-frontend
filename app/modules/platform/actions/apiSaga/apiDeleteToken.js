// @flow

import * as a from '../../actionTypes';

const apiDeleteToken = (refreshToken: string): a.ApiDeleteTokenAction => {
  return {
    type: a.API_DELETE_TOKEN,
    payload: {
      refreshToken,
    },
  };
};

export default apiDeleteToken;
