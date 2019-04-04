// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_AND_CLEAR_OLD_IN_STATE: 'asyncRequests/SET_AND_CLEAR_OLD_IN_STATE' = 'asyncRequests/SET_AND_CLEAR_OLD_IN_STATE';
export const SET_REFRESHING_IN_STATE: 'asyncRequests/SET_REFRESHING_IN_STATE' = 'asyncRequests/SET_REFRESHING_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetAndClearOldInStateAction = {|
  ...ReducerAction,
  type: typeof SET_AND_CLEAR_OLD_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    asyncRequest: m.AsyncRequest,
  |},
|};

export type SetRefreshingInStateAction = {|
  ...ReducerAction,
  type: typeof SET_REFRESHING_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    refreshing: boolean,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type AsyncRequestsReducerAction =
  | SetAndClearOldInStateAction
  | SetRefreshingInStateAction;
