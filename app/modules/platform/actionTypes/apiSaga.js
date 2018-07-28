// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH: 'platform/API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH' = 'platform/API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH';
export const API_DELETE_TOKEN: 'platform/API_DELETE_TOKEN' = 'platform/API_DELETE_TOKEN';
export const API_POST_CONFIRMATION: 'platform/API_POST_CONFIRMATION' = 'platform/API_POST_CONFIRMATION';
export const API_PATCH_CONFIRMATION: 'platform/API_PATCH_CONFIRMATION' = 'platform/API_PATCH_CONFIRMATION';
export const API_POST_PASSWORD: 'platform/API_POST_PASSWORD' = 'platform/API_POST_PASSWORD';
export const API_PATCH_PASSWORD: 'platform/API_PATCH_PASSWORD' = 'platform/API_PATCH_PASSWORD';

// Action types ------------------------------------------------------------------------------------

export type ApiPostSigninToTokenAndGetUserAuthAction = {|
  type: typeof API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH,
  payload: {
    email: string,
    password: string,
  },
|};

export type ApiDeleteTokenAction = {|
  type: typeof API_DELETE_TOKEN,
  payload: {
    token: string,
  },
|};

export type ApiPostConfirmationAction = {|
  type: typeof API_POST_CONFIRMATION,
  payload: {
    email: string,
  },
|};

export type ApiPatchConfirmationAction = {|
  type: typeof API_PATCH_CONFIRMATION,
  payload: {
    confirmationToken: string,
  },
|};

export type ApiPostPasswordAction = {|
  type: typeof API_POST_PASSWORD,
  payload: {
    email: string,
  },
|};

export type ApiPatchPasswordAction = {|
  type: typeof API_PATCH_PASSWORD,
  payload: {
    password: string,
    resetPasswordToken: string,
  },
|};

// ApiSaga action ----------------------------------------------------------------------------------

export type ApiSagaAction =
  | ApiPostSigninToTokenAndGetUserAuthAction
  | ApiDeleteTokenAction
  | ApiPostConfirmationAction
  | ApiPatchConfirmationAction
  | ApiPostPasswordAction
  | ApiPatchPasswordAction;
