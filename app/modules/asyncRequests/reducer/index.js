// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import setAndClearOldInState from './setAndClearOldInState';
import setRefreshing from './setRefreshing';

const initialState: m.AsyncRequestsState = {
  byId: {},
  refreshing: false,
};

const reducer = (
  state: m.AsyncRequestsState = initialState,
  action: a.AsyncRequestsReducerAction,
): m.AsyncRequestsState => {
  switch (action.type) {
    case a.SET_AND_CLEAR_OLD_IN_STATE:
      return setAndClearOldInState(state, action);
    case a.SET_REFRESHING:
      return setRefreshing(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
