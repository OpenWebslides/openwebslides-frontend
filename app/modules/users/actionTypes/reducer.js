// @flow
/* eslint-disable no-multiple-empty-lines */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const ADD_TO_STATE: 'users/ADD_TO_STATE' = 'users/ADD_TO_STATE';
export const SET_MULTIPLE_IN_STATE: 'users/SET_MULTIPLE_IN_STATE' = 'users/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type AddToStateAction = {|
  type: typeof ADD_TO_STATE,
  payload: {
    id: string,
    firstName: string,
    lastName: ?string,
    email: ?string,
  },
|};

export type SetMultipleInStateAction = {|
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    users: Array<m.User>,
  },
|};


// Reducer action ----------------------------------------------------------------------------------

export type ReducerAction =
  | AddToStateAction
  | SetMultipleInStateAction;
