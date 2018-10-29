// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_GET: 'pullRequests/API_GET' = 'pullRequests/API_GET';
export const API_POST: 'pullRequests/API_POST' = 'pullRequests/API_POST';


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
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    userId: string,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type PullRequestsApiSagaAction =
  | ApiGetAction
  | ApiPostAction;
