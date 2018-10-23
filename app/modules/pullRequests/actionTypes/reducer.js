// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_MULTIPLE_IN_STATE: 'pullRequests/SET_MULTIPLE_IN_STATE' = 'pullRequests/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetMultipleInStateAction = {|
  ...ReducerAction,
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    pullRequests: $ReadOnlyArray<m.PullRequest>,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type PullRequestsReducerAction =
  | SetMultipleInStateAction;
