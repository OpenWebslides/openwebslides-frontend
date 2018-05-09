// @flow

import type { Error } from 'types/error';

import type { StatusType } from './model';

/* Action constants */

// Reducer actions
export const SET_STATUS: 'api/SET_STATUS' = 'api/SET_STATUS';
export const SET_STATUS_ERROR: 'api/SET_STATUS_ERROR' = 'api/SET_STATUS_ERROR';

/* Action types */

// Reducer actions
export type SetStatusAction = {
  type: typeof SET_STATUS,
  payload: {
    request: string,
    status: StatusType,
    error?: Error,
  },
};

export type SetStatusErrorAction = {
  type: typeof SET_STATUS_ERROR,
  error: Error,
};

export type ApiAction =
  | SetStatusAction
  | SetStatusErrorAction;
