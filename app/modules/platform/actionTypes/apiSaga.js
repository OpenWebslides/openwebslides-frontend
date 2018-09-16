// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH: 'platform/API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH' = 'platform/API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH';
export const API_DELETE_TOKEN: 'platform/API_DELETE_TOKEN' = 'platform/API_DELETE_TOKEN';
export const API_POST_CONFIRMATION: 'platform/API_POST_CONFIRMATION' = 'platform/API_POST_CONFIRMATION';
export const API_PATCH_CONFIRMATION: 'platform/API_PATCH_CONFIRMATION' = 'platform/API_PATCH_CONFIRMATION';
export const API_POST_PASSWORD: 'platform/API_POST_PASSWORD' = 'platform/API_POST_PASSWORD';
export const API_PATCH_PASSWORD: 'platform/API_PATCH_PASSWORD' = 'platform/API_PATCH_PASSWORD';

// Action types ------------------------------------------------------------------------------------

export type ApiPostSigninToTokenAndGetUserAuthAction = {|
  ...ApiSagaAction,
  type: typeof API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    email: string,
    password: string,
  |},
|};

export type ApiDeleteTokenAction = {|
  ...ApiSagaAction,
  type: typeof API_DELETE_TOKEN,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
    token: string,
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
  | ApiPostSigninToTokenAndGetUserAuthAction
  | ApiDeleteTokenAction
  | ApiPostConfirmationAction
  | ApiPatchConfirmationAction
  | ApiPostPasswordAction
  | ApiPatchPasswordAction;
