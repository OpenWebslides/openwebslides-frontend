// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_GET_ALL_BY_USER_ID: 'alerts/API_GET_ALL_BY_USER_ID' = 'alerts/API_GET_ALL_BY_USER_ID';
export const API_PATCH: 'alerts/API_PATCH' = 'alerts/API_PATCH';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAllByUserIdAction = {|
  ...ApiSagaAction,
  type: typeof API_GET_ALL_BY_USER_ID,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    +userId: string,
  |},
|};

export type ApiPatchAction = {|
  ...ApiSagaAction,
  type: typeof API_PATCH,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    +id: string,
    +read: boolean,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type AlertsApiSagaAction =
  | ApiGetAllByUserIdAction
  | ApiPatchAction;
