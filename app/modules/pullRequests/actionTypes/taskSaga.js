// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const FETCH: 'pullRequests/FETCH' = 'pullRequests/FETCH';


// Action types ------------------------------------------------------------------------------------

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
  | FetchAction;
