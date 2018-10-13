// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const CREATE: 'topics/CREATE' = 'topics/CREATE';
export const DISCARD: 'topics/DISCARD' = 'topics/DISCARD';
export const UPDATE_WITH_CONTENT: 'topics/UPDATE_WITH_CONTENT' = 'topics/UPDATE_WITH_CONTENT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';
export const FETCH: 'topics/FETCH' = 'topics/FETCH';
export const FETCH_WITH_CONTENT: 'topics/FETCH_WITH_CONTENT' = 'topics/FETCH_WITH_CONTENT';
export const FORK: 'topics/FORK' = 'topics/FORK';


// Action types ------------------------------------------------------------------------------------

export type CreateAction = {|
  ...TaskSagaAction,
  type: typeof CREATE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    title: string,
    description: ?string,
    userId: string,
  |},
|};

export type DiscardAction = {|
  ...TaskSagaAction,
  type: typeof DISCARD,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type UpdateWithContentAction = {|
  ...TaskSagaAction,
  type: typeof UPDATE_WITH_CONTENT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    title?: string,
    description?: ?string,
  |},
|};

export type RemoveAction = {|
  ...TaskSagaAction,
  type: typeof REMOVE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
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

export type FetchWithContentAction = {|
  ...TaskSagaAction,
  type: typeof FETCH_WITH_CONTENT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type ForkAction = {|
  ...TaskSagaAction,
  type: typeof FORK,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

// TaskSaga action ---------------------------------------------------------------------------------

export type TopicsTaskSagaAction =
  | CreateAction
  | DiscardAction
  | UpdateWithContentAction
  | RemoveAction
  | FetchAction
  | FetchWithContentAction
  | ForkAction;
