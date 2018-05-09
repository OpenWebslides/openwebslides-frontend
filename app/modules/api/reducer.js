// @flow

import type { ApiState } from './model';
import * as t from './actionTypes';

const initialState: ApiState = {};

const setStatus = (state: ApiState, action: t.SetStatusAction): ApiState => {
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
    case t.SET_STATUS:
      return setStatus(state, action);
    case t.SET_STATUS_ERROR:
      return state;
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
