// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import setUserAuthInState from './setUserAuthInState';
import setSettingInState from './setSettingInState';

const initialState: m.PlatformState = {
  userAuth: null,
  settings: {
    activeSidebarIds: [],
  },
};

const reducer = (
  state: m.PlatformState = initialState,
  action: a.ReducerAction,
): m.PlatformState => {
  switch (action.type) {
    case a.SET_USER_AUTH_IN_STATE:
      return setUserAuthInState(state, action);
    case a.SET_SETTING_IN_STATE:
      return setSettingInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
