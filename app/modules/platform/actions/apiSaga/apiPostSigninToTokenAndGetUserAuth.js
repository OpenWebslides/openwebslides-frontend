// @flow

import * as t from '../../actionTypes';

const apiPostSigninToTokenAndGetUserAuth = (
  email: string,
  password: string,
): t.ApiPostSigninToTokenAndGetUserAuthAction => {
  return {
    type: t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH,
    payload: {
      email,
      password,
    },
  };
};

export default apiPostSigninToTokenAndGetUserAuth;
