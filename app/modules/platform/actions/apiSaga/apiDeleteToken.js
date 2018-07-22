// @flow

import * as t from '../../actionTypes';

const apiDeleteToken = (token: string): t.ApiDeleteTokenAction => {
  return {
    type: t.API_DELETE_TOKEN,
    payload: {
      token,
    },
  };
};

export default apiDeleteToken;
