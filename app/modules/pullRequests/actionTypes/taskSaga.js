// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const CREATE: 'pullRequests/CREATE' = 'pullRequests/CREATE';
export const FETCH: 'pullRequests/FETCH' = 'pullRequests/FETCH';


// Action types ------------------------------------------------------------------------------------

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


// TaskSaga action ---------------------------------------------------------------------------------

export type PullRequestsTaskSagaAction =
  | CreateAction
  | FetchAction;
