// @flow

import type { ApiState } from './model';
import * as t from './actionTypes';

const initialState: ApiState = {};

const setStatus = (state: ApiState, action: t.SetStatusInStateAction): ApiState => {
  const { request, status, error } = action.payload;

  return {
    ...state,
    [request]: {
      status,
      error,
    },
  };
};

const reducer = (state: ApiState = initialState, action: t.ApiAction): ApiState => {
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
