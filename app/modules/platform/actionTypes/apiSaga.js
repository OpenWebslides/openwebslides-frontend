// @flow
/* eslint-disable no-multiple-empty-lines */

import type { ApiToken } from 'lib/ApiRequest';


// Action constants --------------------------------------------------------------------------------

export const API_POST_SIGNIN_AND_GET_USER_AUTH: 'platform/API_POST_SIGNIN_AND_GET_USER_AUTH' = 'platform/API_POST_SIGNIN_AND_GET_USER_AUTH';
export const API_DELETE_TOKEN: 'platform/API_DELETE_TOKEN' = 'platform/API_DELETE_TOKEN';
export const API_POST_CONFIRMATION: 'platform/API_POST_CONFIRMATION' = 'platform/API_POST_CONFIRMATION';
export const API_POST_PASSWORD: 'platform/API_POST_PASSWORD' = 'platform/API_POST_PASSWORD';


// Action types ------------------------------------------------------------------------------------

export type ApiPostSigninAndGetUserAuthAction = {|
  type: typeof API_POST_SIGNIN_AND_GET_USER_AUTH,
  payload: {
    email: string,
    password: string,
  },
|};

export type ApiDeleteTokenAction = {|
  type: typeof API_DELETE_TOKEN,
  payload: {
    token: ApiToken,
  },
|};

export type ApiPostConfirmationAction = {|
  type: typeof API_POST_CONFIRMATION,
  payload: {
    email: string,
  },
|};

export type ApiPostPasswordAction = {|
  type: typeof API_POST_PASSWORD,
  payload: {
    email: string,
  },
|};
