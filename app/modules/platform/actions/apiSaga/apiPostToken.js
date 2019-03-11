// @flow

import * as a from '../../actionTypes';

const apiPostToken = (
  email: string,
  password: string,
): a.ApiPostToken => {
  return {
    type: a.API_POST_TOKEN,
    payload: {
      email,
      password,
    },
  };
};

export default apiPostToken;
