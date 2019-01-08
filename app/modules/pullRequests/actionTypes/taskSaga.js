// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const ACCEPT: 'pullRequests/ACCEPT' = 'pullRequests/ACCEPT';
export const CREATE: 'pullRequests/CREATE' = 'pullRequests/CREATE';
export const FETCH: 'pullRequests/FETCH' = 'pullRequests/FETCH';
export const REJECT: 'pullRequests/REJECT' = 'pullRequests/REJECT';


// Action types ------------------------------------------------------------------------------------

export type AcceptAction = {|
  ...TaskSagaAction,
  type: typeof ACCEPT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    feedback: ?string,
  |},
|};

export type CreateAction = {|
  ...TaskSagaAction,
  type: typeof CREATE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    userId: string,
  |},
|};

export type FetchAction = {|
  ...TaskSagaAction,
  type: typeof FETCH,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type RejectAction = {|
  ...TaskSagaAction,
  type: typeof REJECT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    feedback: ?string,
  |},
|};

// TaskSaga action ---------------------------------------------------------------------------------

export type PullRequestsTaskSagaAction =
  | AcceptAction
  | CreateAction
  | FetchAction
  | RejectAction;
