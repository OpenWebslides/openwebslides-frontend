// @flow

import type { ErrorAction } from 'types/error';
import type { ErrorState } from 'types/state';

const initialState: ErrorState = {};

const errorReducer = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {
  if (action.error instanceof Error) {
    // #TODO stub
    console.error(action.error.message);
    console.error(action.error);
  }

  return state;
};

export default errorReducer;
