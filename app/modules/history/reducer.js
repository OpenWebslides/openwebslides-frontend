// @flow

import * as t from './actionTypes';
import type { HistoryState } from './model';

const initialState: HistoryState = {
  location: null,
};

const setinState = (state: HistoryState, action: t.SetInStateAction): HistoryState => {
  return {
    location: action.payload.location,
  };
};

const reducer = (
  state: HistoryState = initialState,
  action: t.HistoryReducerAction,
): HistoryState => {
  switch (action.type) {
    case t.SET_IN_STATE:
      return setinState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
