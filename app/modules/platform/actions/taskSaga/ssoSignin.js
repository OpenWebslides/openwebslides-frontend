// @flow

import * as a from '../../actionTypes';

const ssoSignin = (
  userId: string,
  refreshToken: string,
): a.SSOSigninAction => {
  return {
    type: a.SSO_SIGNIN,
    payload: {
      userId,
      refreshToken,
    },
  };
};

export default ssoSignin;
