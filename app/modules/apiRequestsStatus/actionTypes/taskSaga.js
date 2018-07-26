// @flow
/* eslint-disable no-multiple-empty-lines */


// Action constants --------------------------------------------------------------------------------

export const SET_PENDING: 'apiRequestsStatus/SET_PENDING' = 'apiRequestsStatus/SET_PENDING';
export const SET_SUCCESS: 'apiRequestsStatus/SET_SUCCESS' = 'apiRequestsStatus/SET_SUCCESS';
export const SET_FAILURE: 'apiRequestsStatus/SET_FAILURE' = 'apiRequestsStatus/SET_FAILURE';


// Action types ------------------------------------------------------------------------------------

export type SetPendingAction = {|
  type: typeof SET_PENDING,
  payload: {
    requestId: string,
  },
|};

export type SetSuccessAction = {|
  type: typeof SET_SUCCESS,
  payload: {
    requestId: string,
    value: mixed,
  },
|};

export type SetFailureAction = {|
  type: typeof SET_FAILURE,
  payload: {
    requestId: string,
    error: Error,
  },
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type TaskSagaAction =
  | SetPendingAction
  | SetSuccessAction
  | SetFailureAction;

