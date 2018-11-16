// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const FETCH_ALL: 'alerts/FETCH_ALL' = 'alerts/FETCH_ALL';
export const MARK_AS_READ: 'alerts/MARK_AS_READ' = 'alerts/MARK_AS_READ';


// Action types ------------------------------------------------------------------------------------

export type FetchAllAction = {|
  ...TaskSagaAction,
  type: typeof FETCH_ALL,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
  |},
|};

export type MarkAsReadAction = {|
  ...TaskSagaAction,
  type: typeof MARK_AS_READ,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type AlertsTaskSagaAction =
  | FetchAllAction
  | MarkAsReadAction;
