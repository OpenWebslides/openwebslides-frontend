// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_POST_TOKEN: 'platform/API_POST_TOKEN' = 'platform/API_POST_TOKEN';
export const API_PATCH_TOKEN: 'platform/API_PATCH_TOKEN' = 'platform/API_PATCH_TOKEN';
export const API_DELETE_TOKEN: 'platform/API_DELETE_TOKEN' = 'platform/API_DELETE_TOKEN';
export const API_POST_CONFIRMATION: 'platform/API_POST_CONFIRMATION' = 'platform/API_POST_CONFIRMATION';
export const API_PATCH_CONFIRMATION: 'platform/API_PATCH_CONFIRMATION' = 'platform/API_PATCH_CONFIRMATION';
export const API_POST_PASSWORD: 'platform/API_POST_PASSWORD' = 'platform/API_POST_PASSWORD';
export const API_PATCH_PASSWORD: 'platform/API_PATCH_PASSWORD' = 'platform/API_PATCH_PASSWORD';

// Action types ------------------------------------------------------------------------------------

export type ApiPostToken = {|
  ...ApiSagaAction,
  type: typeof API_POST_TOKEN,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    email: string,
    password: string,
  |},
|};

export type ApiPatchToken = {|
  ...ApiSagaAction,
  type: typeof API_PATCH_TOKEN,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    email: string,
    refreshToken: string,
  |},
|};

export type ApiDeleteTokenAction = {|
  ...ApiSagaAction,
  type: typeof API_DELETE_TOKEN,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    refreshToken: string,
  |},
|};

export type ApiPostConfirmationAction = {|
  ...ApiSagaAction,
  type: typeof API_POST_CONFIRMATION,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    email: string,
  |},
|};

export type ApiPatchConfirmationAction = {|
  ...ApiSagaAction,
  type: typeof API_PATCH_CONFIRMATION,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    confirmationToken: string,
  |},
|};

export type ApiPostPasswordAction = {|
  ...ApiSagaAction,
  type: typeof API_POST_PASSWORD,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    email: string,
  |},
|};

export type ApiPatchPasswordAction = {|
  ...ApiSagaAction,
  type: typeof API_PATCH_PASSWORD,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    password: string,
    resetPasswordToken: string,
  |},
|};

// ApiSaga action ----------------------------------------------------------------------------------

export type PlatformApiSagaAction =
  | ApiPostToken
  | ApiPatchToken
  | ApiDeleteTokenAction
  | ApiPostConfirmationAction
  | ApiPatchConfirmationAction
  | ApiPostPasswordAction
  | ApiPatchPasswordAction;
