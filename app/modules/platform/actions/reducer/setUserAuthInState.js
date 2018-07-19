// @flow

import * as t from '../../actionTypes';
import * as m from '../../model';

const setUserAuthInState = (userAuth: ?m.UserAuth): t.SetUserAuthInStateAction => {
  return {
    type: t.SET_USER_AUTH_IN_STATE,
    payload: {
      userAuth: userAuth || null,
    },
  };
};

export default setUserAuthInState;
