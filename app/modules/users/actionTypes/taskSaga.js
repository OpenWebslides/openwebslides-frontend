// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const ADD_TOPIC: 'users/ADD_TOPIC' = 'users/ADD_TOPIC';
export const ADD_TOPIC_ID: 'users/ADD_TOPIC_ID' = 'users/ADD_TOPIC_ID';
export const FETCH: 'users/FETCH' = 'users/FETCH';
export const FORK_TOPIC: 'users/FORK_TOPIC' = 'users/FORK_TOPIC';
export const REMOVE_TOPIC: 'users/REMOVE_TOPIC' = 'users/REMOVE_TOPIC';
export const REMOVE_TOPIC_ID: 'users/REMOVE_TOPIC_ID' = 'users/REMOVE_TOPIC_ID';


// Action types ------------------------------------------------------------------------------------

export type AddTopicAction = {|
  ...TaskSagaAction,
  type: typeof ADD_TOPIC,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    title: string,
    description: ?string,
  |},
|};

export type RemoveTopicIdAction = {|
  ...TaskSagaAction,
  type: typeof REMOVE_TOPIC_ID,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    topicId: string,
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

export type ForkTopicAction = {|
  ...TaskSagaAction,
  type: typeof FORK_TOPIC,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    topicId: string,
  |},
|};

export type RemoveTopicAction = {|
  ...TaskSagaAction,
  type: typeof REMOVE_TOPIC,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    topicId: string,
  |},
|};

export type AddTopicIdAction = {|
  ...TaskSagaAction,
  type: typeof ADD_TOPIC_ID,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    topicId: string,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type UsersTaskSagaAction =
  | AddTopicAction
  | AddTopicIdAction
  | FetchAction
  | ForkTopicAction
  | RemoveTopicAction
  | RemoveTopicIdAction;
