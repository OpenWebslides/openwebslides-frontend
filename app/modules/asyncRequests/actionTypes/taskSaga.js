// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const SET_PENDING: 'asyncRequests/SET_PENDING' = 'asyncRequests/SET_PENDING';
export const SET_SUCCESS: 'asyncRequests/SET_SUCCESS' = 'asyncRequests/SET_SUCCESS';
export const SET_FAILURE: 'asyncRequests/SET_FAILURE' = 'asyncRequests/SET_FAILURE';


// Action types ------------------------------------------------------------------------------------

export type SetPendingAction = {|
  type: typeof SET_PENDING,
  payload: {
    id: string,
  },
|};

export type SetSuccessAction = {|
  type: typeof SET_SUCCESS,
  payload: {
    id: string,
    value: mixed,
  },
|};

export type SetFailureAction = {|
  type: typeof SET_FAILURE,
  payload: {
    id: string,
    error: Error,
  },
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type AsyncRequestsTaskSagaAction =
  | SetPendingAction
  | SetSuccessAction
  | SetFailureAction;

