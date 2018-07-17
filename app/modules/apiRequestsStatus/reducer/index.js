// @flow

import * as t from '../actionTypes';
import * as m from '../model';

import setStatusInState from './setStatusInState';

const initialState: m.ApiRequestsStatusState = {};

const reducer = (
  state: m.ApiRequestsStatusState = initialState,
  action: t.ReducerAction,
): m.ApiRequestsStatusState => {
  switch (action.type) {
    case t.SET_STATUS_IN_STATE:
      return setStatusInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
