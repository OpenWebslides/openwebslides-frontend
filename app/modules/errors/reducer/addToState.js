// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const addToState = (
  state: m.ErrorsState,
  action: a.AddToStateAction,
): m.ErrorsState => {
  const { loggedError } = action.payload;

  return {
    ...state,
    log: [
      ...state.log,
      loggedError,
    ],
  };
};

export default addToState;
