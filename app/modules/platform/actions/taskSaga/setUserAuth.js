// @flow

import * as a from '../../actionTypes';

const setUserAuth = (apiToken: string, userId: string): a.SetUserAuthAction => {
  return {
    type: a.SET_USER_AUTH,
    payload: {
      apiToken,
      userId,
    },
  };
};

export default setUserAuth;
