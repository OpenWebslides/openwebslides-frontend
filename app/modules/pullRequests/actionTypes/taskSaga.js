// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const FETCH: 'pullRequests/FETCH' = 'pullRequests/FETCH';
export const SUBMIT: 'pullRequests/SUBMIT' = 'pullRequests/SUBMIT';


// Action types ------------------------------------------------------------------------------------

export type FetchAction = {|
  ...TaskSagaAction,
  type: typeof FETCH,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type SubmitAction = {|
  ...TaskSagaAction,
  type: typeof SUBMIT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    message: string,
    topicId: string,
    userId: string,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type PullRequestsTaskSagaAction =
  | FetchAction
  | SubmitAction;
