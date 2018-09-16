// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const SET_PENDING: 'asyncRequests/SET_PENDING' = 'asyncRequests/SET_PENDING';
export const SET_SUCCESS: 'asyncRequests/SET_SUCCESS' = 'asyncRequests/SET_SUCCESS';
export const SET_FAILURE: 'asyncRequests/SET_FAILURE' = 'asyncRequests/SET_FAILURE';


// Action types ------------------------------------------------------------------------------------

export type SetPendingAction = {|
  ...TaskSagaAction,
  type: typeof SET_PENDING,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type SetSuccessAction = {|
  ...TaskSagaAction,
  type: typeof SET_SUCCESS,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    value: mixed,
  |},
|};

export type SetFailureAction = {|
  ...TaskSagaAction,
  type: typeof SET_FAILURE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    error: Error,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type AsyncRequestsTaskSagaAction =
  | SetPendingAction
  | SetSuccessAction
  | SetFailureAction;

