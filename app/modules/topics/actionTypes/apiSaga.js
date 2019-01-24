// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const API_GET: 'topics/API_GET' = 'topics/API_GET';
export const API_PATCH: 'topics/API_PATCH' = 'topics/API_PATCH';
export const API_POST: 'topics/API_POST' = 'topics/API_POST';
export const API_DELETE: 'topics/API_DELETE' = 'topics/API_DELETE';
export const API_POST_FORK: 'topics/API_POST_FORK' = 'topics/API_POST_FORK';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAction = {|
  ...ApiSagaAction,
  type: typeof API_GET,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    id: string,
  |},
|};

export type ApiPatchAction = {|
  ...ApiSagaAction,
  type: typeof API_PATCH,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    id: string,
    title: ?string,
    description: ?string,
    access: ?m.AccessType,
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

export type ApiPostForkAction = {|
  ...ApiSagaAction,
  type: typeof API_POST_FORK,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    id: string,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type TopicsApiSagaAction =
  | ApiGetAction
  | ApiPatchAction
  | ApiPostAction
  | ApiDeleteAction
  | ApiPostForkAction;
