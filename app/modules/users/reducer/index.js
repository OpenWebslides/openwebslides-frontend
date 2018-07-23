// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import addToState from './addToState';
import setMultipleInState from './setMultipleInState';

const initialState: m.UsersState = {
  byId: {},
};

const reducer = (
  state: m.UsersState = initialState,
  action: a.ReducerAction,
): m.UsersState => {
  switch (action.type) {
    case a.ADD_TO_STATE:
      return addToState(state, action);
    case a.SET_MULTIPLE_IN_STATE:
      return setMultipleInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
