// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import addToState from './addToState';

const initialState: m.ErrorsState = {
  log: [],
};

const reducer = (
  state: m.ErrorsState = initialState,
  action: a.ErrorsReducerAction,
): m.ErrorsState => {
  switch (action.type) {
    case a.ADD_TO_STATE:
      return addToState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
