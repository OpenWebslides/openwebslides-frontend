// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const ADD_TOPIC: 'users/ADD_TOPIC' = 'users/ADD_TOPIC';
export const ADD_TOPIC_ID: 'users/ADD_TOPIC_ID' = 'users/ADD_TOPIC_ID';
export const FETCH: 'users/FETCH' = 'users/FETCH';
export const FORK_TOPIC: 'users/FORK_TOPIC' = 'users/FORK_TOPIC';
export const REMOVE_TOPIC: 'users/REMOVE_TOPIC' = 'users/REMOVE_TOPIC';
export const REMOVE_TOPIC_ID: 'users/REMOVE_TOPIC_ID' = 'users/REMOVE_TOPIC_ID';
export const SIGNUP: 'users/SIGNUP' = 'users/SIGNUP';
export const UPDATE: 'users/UPDATE' = 'users/UPDATE';
export const UPDATE_PASSWORD: 'users/UPDATE_PASSWORD' = 'users/UPDATE_PASSWORD';


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

export type AddTopicIdAction = {|
  ...TaskSagaAction,
  type: typeof ADD_TOPIC_ID,
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

export type RemoveTopicIdAction = {|
  ...TaskSagaAction,
  type: typeof REMOVE_TOPIC_ID,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    topicId: string,
  |},
|};

export type SignupAction = {|
  ...TaskSagaAction,
  type: typeof SIGNUP,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    email: string,
    name: string,
    password: string,
    tosAccepted: boolean,
  |},
|};

export type UpdateAction = {|
  ...TaskSagaAction,
  type: typeof UPDATE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    name: string,
    locale: string,
    alertEmails: boolean,
    age: number,
    gender: m.GenderType,
    role: m.RoleType,
    country: m.CountryType,
  |},
|};

export type UpdatePasswordAction = {|
  ...TaskSagaAction,
  type: typeof UPDATE_PASSWORD,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    currentPassword: string,
    password: string,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type UsersTaskSagaAction =
  | AddTopicAction
  | AddTopicIdAction
  | FetchAction
  | ForkTopicAction
  | RemoveTopicAction
  | RemoveTopicIdAction
  | SignupAction
  | UpdateAction
  | UpdatePasswordAction;
