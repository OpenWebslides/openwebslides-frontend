// @flow

import type { ApiToken } from 'lib/ApiRequest';

import * as t from '../../actionTypes';

const apiDeleteToken = (token: ApiToken): t.ApiDeleteTokenAction => {
  return {
    type: t.API_DELETE_TOKEN,
    payload: {
      token,
    },
  };
};

export default apiDeleteToken;
