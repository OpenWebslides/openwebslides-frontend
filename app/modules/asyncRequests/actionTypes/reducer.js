// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_IN_STATE: 'asyncRequests/SET_IN_STATE' = 'asyncRequests/SET_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetInStateAction = {|
  ...ReducerAction,
  type: typeof SET_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    asyncRequest: m.AsyncRequest,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type AsyncRequestsReducerAction =
  | SetInStateAction;
