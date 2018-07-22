// @flow

import _ from 'lodash';

import * as a from '../actionTypes';
import * as m from '../model';

const setUserAuthInState = (
  state: m.PlatformState,
  action: a.SetUserAuthInStateAction,
): m.PlatformState => {
  const { userAuth } = action.payload;

  if (_.isEqual(userAuth, state.userAuth)) {
    return state;
  }
  else {
    return {
      ...state,
      userAuth,
    };
  }
};

export default setUserAuthInState;
