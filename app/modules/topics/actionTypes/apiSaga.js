// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_GET: 'topics/API_GET' = 'topics/API_GET';
export const API_POST: 'topics/API_POST' = 'topics/API_POST';
export const API_DELETE: 'topics/API_DELETE' = 'topics/API_DELETE';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAction = {|
  ...ApiSagaAction,
  type: typeof API_GET,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    id: string,
  |},
|};

export type ApiPostAction = {|
  ...ApiSagaAction,
  type: typeof API_POST,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    title: string,
    description: ?string,
    rootContentItemId: string,
    userId: string,
  |},
|};

export type ApiDeleteAction = {|
  ...ApiSagaAction,
  type: typeof API_DELETE,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    id: string,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type TopicsApiSagaAction =
  | ApiGetAction
  | ApiPostAction
  | ApiDeleteAction;
