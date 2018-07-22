// @flow

import * as a from '../../actionTypes';

const apiPostSigninToTokenAndGetUserAuth = (
  email: string,
  password: string,
): a.ApiPostSigninToTokenAndGetUserAuthAction => {
  return {
    type: a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH,
    payload: {
      email,
      password,
    },
  };
};

export default apiPostSigninToTokenAndGetUserAuth;
