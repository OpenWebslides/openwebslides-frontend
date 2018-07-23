// @flow

import * as a from '../../actionTypes';

const apiDeleteToken = (token: string): a.ApiDeleteTokenAction => {
  return {
    type: a.API_DELETE_TOKEN,
    payload: {
      token,
    },
  };
};

export default apiDeleteToken;
