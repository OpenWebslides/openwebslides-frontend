// @flow

import * as t from '../../actionTypes';

const apiPostSigninAndGetUserAuth = (
  email: string,
  password: string,
): t.ApiPostSigninAndGetUserAuthAction => {
  return {
    type: t.API_POST_SIGNIN_AND_GET_USER_AUTH,
    payload: {
      email,
      password,
    },
  };
};

export default apiPostSigninAndGetUserAuth;
