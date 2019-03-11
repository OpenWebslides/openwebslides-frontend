// @flow

import * as a from '../../actionTypes';

const setUserAuth = (
  userId: string,
  refreshToken: string,
  accessToken: ?string,
): a.SetUserAuthAction => {
  return {
    type: a.SET_USER_AUTH,
    payload: {
      userId,
      refreshToken,
      accessToken,
    },
  };
};

export default setUserAuth;
