// @flow

import type { Error } from 'types/error';

type ErrorAction = {
  type: string,
  error: Error,
};

type ErrorState = {};

const initialState: ErrorState = {};

const errorReducer = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {
  if (action.error != null) {
    // #TODO stub
    console.log(action.error.message);
  }

  return state;
};

export default errorReducer;
