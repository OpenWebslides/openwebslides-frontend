// @flow

import type { ApiRequestsStatusState } from './model';
import * as t from './actionTypes';

const initialState: ApiRequestsStatusState = {};

const setStatus = (
  state: ApiRequestsStatusState,
  action: t.SetStatusInStateAction,
): ApiRequestsStatusState => {
  const { request, status, error } = action.payload;

  return {
    ...state,
    [request]: {
      status,
      error,
    },
  };
};

const reducer = (
  state: ApiRequestsStatusState = initialState,
  action: t.ApiAction,
): ApiRequestsStatusState => {
  switch (action.type) {
    case t.SET_STATUS_IN_STATE:
      return setStatus(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export default reducer;
