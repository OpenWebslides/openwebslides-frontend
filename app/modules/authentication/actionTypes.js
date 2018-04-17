// @flow

import type { Error } from 'types/error';

export const SIGNIN_EMAIL: 'auth/SIGNIN_EMAIL' = 'auth/SIGNIN_EMAIL';
export const SIGNIN_EMAIL_SUCCESS: 'auth/SIGNIN_EMAIL_SUCCESS' = 'auth/SIGNIN_EMAIL_SUCCESS';
export const SIGNIN_EMAIL_FAILURE: 'auth/SIGNIN_EMAIL_FAILURE' = 'auth/SIGNIN_EMAIL_FAILURE';

export const SIGNIN_OAUTH: 'auth/SIGNIN_OAUTH' = 'auth/SIGNIN_OAUTH';
export const SIGNIN_OAUTH_SUCCESS: 'auth/SIGNIN_OAUTH_SUCCESS' = 'auth/SIGNIN_OAUTH_SUCCESS';
export const SIGNIN_OAUTH_FAILURE: 'auth/SIGNIN_OAUTH_FAILURE' = 'auth/SIGNIN_OAUTH_FAILURE';

export const SIGNUP: 'auth/SIGNUP' = 'auth/SIGNUP';
export const SIGNUP_SUCCESS: 'auth/SIGNUP_SUCCESS' = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE: 'auth/SIGNUP_FAILURE' = 'auth/SIGNUP_FAILURE';

export const SIGNOUT: 'auth/SIGNOUT' = 'auth/SIGNOUT';
export const SIGNOUT_SUCCESS: 'auth/SIGNOUT_SUCCESS' = 'auth/SIGNOUT_SUCCESS';
export const SIGNOUT_FAILURE: 'auth/SIGNOUT_FAILURE' = 'auth/SIGNOUT_FAILURE';

export const RESET: 'auth/RESET' = 'auth/RESET';
export const CONFIRM: 'auth/CONFIRM' = 'auth/CONFIRM';

export type SigninEmailAction = {
  type: typeof SIGNIN_EMAIL,
  payload: {
    email: string,
    password: string,
  },
};

export type SigninOAuthAction = {
  type: typeof SIGNIN_OAUTH,
  payload: {
    email: string,
  },
};

export type SignupAction = {
  type: typeof SIGNUP,
  payload: {
    email: string,
    password: string,
    firstName: string,
    lastName: ?string,
  },
};

export type SignoutAction = {
  type: typeof SIGNOUT,
};

export type SigninEmailSuccessAction = {
  type: typeof SIGNIN_EMAIL_SUCCESS,
};

export type SigninOAuthSuccessAction = {
  type: typeof SIGNIN_OAUTH_SUCCESS,
};

export type SignupSuccessAction = {
  type: typeof SIGNUP_SUCCESS,
  error: Error,
};

export type SignoutSuccessAction = {
  type: typeof SIGNOUT_SUCCESS,
  error: Error,
};

export type SigninEmailFailureAction = {
  type: typeof SIGNIN_EMAIL_FAILURE,
  error: Error,
};

export type SigninOAuthFailureAction = {
  type: typeof SIGNIN_OAUTH_FAILURE,
  error: Error,
};

export type SignupFailureAction = {
  type: typeof SIGNUP_FAILURE,
  error: Error,
};

export type SignoutFailureAction = {
  type: typeof SIGNOUT_FAILURE,
  error: Error,
};

export type ResetAction = {
  type: typeof RESET,
  payload: {
    email: string,
  },
};

export type ConfirmAction = {
  type: typeof CONFIRM,
  payload: {
    email: string,
  },
};

export type SigninSuccessAction =
  | SigninEmailSuccessAction
  | SigninOAuthSuccessAction;

export type SigninFailureAction =
  | SigninEmailFailureAction
  | SigninOAuthFailureAction;

export type AuthenticationAction =
  | SigninEmailAction
  | SigninOAuthAction
  | SignupAction
  | SignoutAction
  | SigninEmailSuccessAction
  | SigninOAuthSuccessAction
  | SignupSuccessAction
  | SignoutSuccessAction
  | SigninEmailFailureAction
  | SigninOAuthFailureAction
  | SignupFailureAction
  | SignoutFailureAction
  | ResetAction
  | ConfirmAction;
