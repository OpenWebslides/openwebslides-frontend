// @flow
/* eslint-disable no-multiple-empty-lines */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_MULTIPLE_IN_STATE: 'users/SET_MULTIPLE_IN_STATE' = 'users/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetMultipleInStateAction = {|
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    users: Array<m.User>,
  },
|};


// Reducer action ----------------------------------------------------------------------------------

export type ReducerAction =
  | SetMultipleInStateAction;
