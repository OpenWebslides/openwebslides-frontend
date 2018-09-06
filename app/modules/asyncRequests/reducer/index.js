// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import setInState from './setInState';

const initialState: m.AsyncRequestsState = {
  byId: {},
};

const reducer = (
  state: m.AsyncRequestsState = initialState,
  action: a.ReducerAction,
): m.AsyncRequestsState => {
  switch (action.type) {
    case a.SET_IN_STATE:
      return setInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
