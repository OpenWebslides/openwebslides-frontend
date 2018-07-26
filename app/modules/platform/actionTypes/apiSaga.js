// @flow
/* eslint-disable no-multiple-empty-lines */


// Action constants --------------------------------------------------------------------------------

export const API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH: 'platform/API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH' = 'platform/API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH';
export const API_DELETE_TOKEN: 'platform/API_DELETE_TOKEN' = 'platform/API_DELETE_TOKEN';
export const API_POST_CONFIRMATION: 'platform/API_POST_CONFIRMATION' = 'platform/API_POST_CONFIRMATION';
export const API_POST_EMAIL_TO_CONFIRMATION: 'platform/API_POST_EMAIL_TO_CONFIRMATION' = 'platform/API_POST_EMAIL_TO_CONFIRMATION';
export const API_POST_EMAIL_TO_PASSWORD: 'platform/API_POST_EMAIL_TO_PASSWORD' = 'platform/API_POST_EMAIL_TO_PASSWORD';


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
    confirmationToken: string,
  },
|};

export type ApiPostEmailToConfirmationAction = {|
  type: typeof API_POST_EMAIL_TO_CONFIRMATION,
  payload: {
    email: string,
  },
|};

export type ApiPostEmailToPasswordAction = {|
  type: typeof API_POST_EMAIL_TO_PASSWORD,
  payload: {
    email: string,
  },
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type ApiSagaAction =
  | ApiPostSigninToTokenAndGetUserAuthAction
  | ApiDeleteTokenAction
  | ApiPostConfirmationAction
  | ApiPostEmailToConfirmationAction
  | ApiPostEmailToPasswordAction;
