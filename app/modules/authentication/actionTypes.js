// @flow

import type { User } from 'modules/users';

import type { Error } from 'types/error';

/* Action constants */

// Reducer actions
export const SET_ACCOUNT: 'auth/SET_ACCOUNT' = 'auth/SET_ACCOUNT';
export const SET_TOKEN: 'auth/SET_TOKEN' = 'auth/SET_TOKEN';

// Task saga actions
export const SIGNIN_EMAIL: 'auth/SIGNIN_EMAIL' = 'auth/SIGNIN_EMAIL';
export const SIGNIN_EMAIL_ERROR: 'auth/SIGNIN_EMAIL' = 'auth/SIGNIN_EMAIL';

export const SIGNOUT: 'auth/SIGNOUT' = 'auth/SIGNOUT';

export const SIGNUP: 'auth/SIGNUP' = 'auth/SIGNUP';
export const SIGNUP_ERROR: 'auth/SIGNUP_ERROR' = 'auth/SIGNUP_ERROR';

export const RESET: 'auth/RESET' = 'auth/RESET';
export const RESET_ERROR: 'auth/RESET_ERROR' = 'auth/RESET_ERROR';

// API saga actions
export const API_POST_TOKEN: 'auth/API_POST_TOKEN' = 'auth/API_POST_TOKEN';
export const API_DELETE_TOKEN: 'auth/API_DELETE_TOKEN' = 'auth/API_DELETE_TOKEN';

export const API_POST_USERS: 'auth/API_POST_USERS' = 'auth/API_POST_USERS';

export const API_POST_PASSWORD: 'auth/API_POST_PASSWORD' = 'auth/API_POST_PASSWORD';

/* Action types */

// Reducer actions
export type SetAccountAction = {
  type: typeof SET_ACCOUNT,
  // eslint-disable-next-line flowtype/no-weak-types
  payload: {
    account: ?User,
  },
};

export type SetTokenAction = {
  type: typeof SET_TOKEN,
  payload: {
    token: ?string,
  },
};

// Task saga actions
export type SigninEmailAction = {
  type: typeof SIGNIN_EMAIL,
  payload: {
    email: string,
    password: string,
  },
};

export type SigninEmailErrorAction = {
  type: typeof SIGNIN_EMAIL_ERROR,
  error: Error,
};

export type SignoutAction = {
  type: typeof SIGNOUT,
};

export type SignupAction = {
  type: typeof SIGNUP,
  payload: {
    email: string,
    firstName: string,
    lastName?: string,
    password: string,
    tosAccepted: boolean,
  },
};

export type SignupErrorAction = {
  type: typeof SIGNUP_ERROR,
  error: Error,
};

export type ResetAction = {
  type: typeof RESET,
  payload: {
    email: string,
  },
};

export type ResetErrorAction = {
  type: typeof RESET_ERROR,
  error: Error,
};

// API saga actions
export type ApiPostTokenAction = {
  type: typeof API_POST_TOKEN,
  payload: {
    email: string,
    password: string,
  },
};

export type ApiDeleteTokenAction = {
  type: typeof API_DELETE_TOKEN,
};

export type ApiPostUsersAction = {
  type: typeof API_POST_USERS,
  payload: {
    email: string,
    firstName: string,
    lastName: ?string,
    password: string,
    tosAccepted: boolean,
  },
};

export type ApiPostPasswordAction = {
  type: typeof API_POST_PASSWORD,
  payload: {
    email: string,
  },
};

export const CONFIRM: 'auth/CONFIRM' = 'auth/CONFIRM';
export const CONFIRM_ERROR: 'auth/CONFIRM_ERROR' = 'auth/CONFIRM_ERROR';

/* CONFIRM */
export type ConfirmAction = {
  type: typeof CONFIRM,
  payload: {
    email: string,
  },
};

export type ConfirmErrorAction = {
  type: typeof CONFIRM_ERROR,
  error: Error,
};

export type AuthenticationAction =
  | SetAccountAction
  | SetTokenAction

  | ConfirmAction
  | ConfirmErrorAction;
