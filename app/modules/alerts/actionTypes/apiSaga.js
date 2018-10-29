// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_GET_ALL_BY_USER_ID: 'alerts/API_GET_ALL_BY_USER_ID' = 'alerts/API_GET_ALL_BY_USER_ID';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAllByUserIdAction = {|
  ...ApiSagaAction,
  type: typeof API_GET_ALL_BY_USER_ID,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    +userId: string,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type AlertsApiSagaAction =
  | ApiGetAllByUserIdAction;
