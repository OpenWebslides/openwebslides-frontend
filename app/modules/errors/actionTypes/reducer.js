// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const ADD_TO_STATE: 'errors/ADD_TO_STATE' = 'errors/ADD_TO_STATE';


// Action types ------------------------------------------------------------------------------------

export type AddToStateAction = {|
  ...ReducerAction,
  type: typeof ADD_TO_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    loggedError: m.LoggedError,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type ErrorsReducerAction =
  | AddToStateAction;
