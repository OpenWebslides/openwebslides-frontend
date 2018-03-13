// @flow

import type { Error } from 'types/error';

export const SIGNIN_EMAIL: 'auth/SIGNIN_EMAIL' = 'auth/SIGNIN_EMAIL';
export const SIGNIN_OAUTH: 'auth/SIGNIN_OAUTH' = 'auth/SIGNIN_OAUTH';
export const SIGNUP: 'auth/SIGNUP' = 'auth/SIGNUP';
export const SIGNOUT: 'auth/SIGNOUT' = 'auth/SIGNOUT';

export const SIGNIN_EMAIL_ERROR: 'auth/SIGNIN_EMAIL_ERROR' = 'auth/SIGNIN_EMAIL_ERROR';
export const SIGNIN_OAUTH_ERROR: 'auth/SIGNIN_OAUTH_ERROR' = 'auth/SIGNIN_OAUTH_ERROR';
export const SIGNUP_ERROR: 'auth/SIGNUP_ERROR' = 'auth/SIGNUP_ERROR';
export const SIGNOUT_ERROR: 'auth/SIGNOUT_ERROR' = 'auth/SIGNOUT_ERROR';

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

export type SigninEmailErrorAction = {
  type: typeof SIGNIN_EMAIL_ERROR,
  error: Error,
};

export type SigninOAuthErrorAction = {
  type: typeof SIGNIN_OAUTH_ERROR,
  error: Error,
};

export type SignupErrorAction = {
  type: typeof SIGNUP_ERROR,
  error: Error,
};

export type SignoutErrorAction = {
  type: typeof SIGNOUT_ERROR,
  error: Error,
};

export type AuthenticationAction =
  | SigninEmailAction
  | SigninOAuthAction
  | SignupAction
  | SignoutAction
  | SigninEmailErrorAction
  | SigninOAuthErrorAction
  | SignupErrorAction
  | SignoutErrorAction;
