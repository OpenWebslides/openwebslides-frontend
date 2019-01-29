// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const API_GET: 'users/API_GET' = 'users/API_GET';
export const API_PATCH: 'users/API_PATCH' = 'users/API_PATCH';
export const API_POST: 'users/API_POST' = 'users/API_POST';


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
    name: ?string,
    locale: ?string,
    alertEmails: ?boolean,
    currentPassword: ?string,
    password: ?string,
    age: ?number,
    gender: ?m.GenderType,
    role: ?m.RoleType,
    country: ?m.CountryType,
  |},
|};

export type ApiPostAction = {|
  ...ApiSagaAction,
  type: typeof API_POST,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    email: string,
    name: string,
    password: string,
    tosAccepted: boolean,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type UsersApiSagaAction =
  | ApiGetAction
  | ApiPatchAction
  | ApiPostAction;
