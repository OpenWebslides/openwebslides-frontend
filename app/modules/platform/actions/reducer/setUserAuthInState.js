// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setUserAuthInState = (userAuth: ?m.UserAuth): a.SetUserAuthInStateAction => {
  return {
    type: a.SET_USER_AUTH_IN_STATE,
    payload: {
      userAuth: userAuth || null,
    },
  };
};

export default setUserAuthInState;
