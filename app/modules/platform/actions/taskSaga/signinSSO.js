// @flow

import * as a from '../../actionTypes';

const signinSSO = (apiToken: string, userId: string): a.SigninSSOAction => {
  return {
    type: a.SIGNIN_SSO,
    payload: {
      apiToken,
      userId,
    },
  };
};

export default signinSSO;
