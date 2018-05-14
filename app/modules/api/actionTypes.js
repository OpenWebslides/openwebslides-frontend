// @flow

import type { Error } from 'types/error';

import type { StatusType } from './model';

/* Action constants */

// Reducer actions
export const SET_STATUS_IN_STATE: 'api/SET_STATUS_IN_STATE_IN_STATE' = 'api/SET_STATUS_IN_STATE_IN_STATE';
export const SET_STATUS_IN_STATE_ERROR: 'api/SET_STATUS_IN_STATE_ERROR' = 'api/SET_STATUS_IN_STATE_ERROR';

/* Action types */

// Reducer actions
export type SetStatusInStateAction = {
  type: typeof SET_STATUS_IN_STATE,
  payload: {
    request: string,
    status: StatusType,
    error?: Error,
  },
};

export type SetStatusInStateErrorAction = {
  type: typeof SET_STATUS_IN_STATE_ERROR,
  error: Error,
};

export type ApiAction =
  | SetStatusInStateAction
  | SetStatusInStateErrorAction;
