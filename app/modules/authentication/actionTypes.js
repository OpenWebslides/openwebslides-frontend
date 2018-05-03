// @flow

import type { Token } from 'lib/api';

import type { User } from 'modules/users';

import type { Error } from 'types/error';

/* Action constants */

// Reducer actions
export const SET_ACCOUNT: 'authentication/SET_ACCOUNT' = 'authentication/SET_ACCOUNT';
export const SET_TOKEN: 'authentication/SET_TOKEN' = 'authentication/SET_TOKEN';

// Task saga actions
export const SIGNIN_EMAIL: 'authentication/SIGNIN_EMAIL' = 'authentication/SIGNIN_EMAIL';
export const SIGNIN_EMAIL_ERROR: 'authentication/SIGNIN_EMAIL' = 'authentication/SIGNIN_EMAIL';

export const SIGNOUT: 'authentication/SIGNOUT' = 'authentication/SIGNOUT';

export const SIGNUP: 'authentication/SIGNUP' = 'authentication/SIGNUP';
export const SIGNUP_ERROR: 'authentication/SIGNUP_ERROR' = 'authentication/SIGNUP_ERROR';

export const RESET: 'authentication/RESET' = 'authentication/RESET';
export const RESET_ERROR: 'authentication/RESET_ERROR' = 'authentication/RESET_ERROR';

export const CONFIRM: 'authentication/CONFIRM' = 'authentication/CONFIRM';
export const CONFIRM_ERROR: 'authentication/CONFIRM_ERROR' = 'authentication/CONFIRM_ERROR';

// API saga actions
export const API_POST_TOKEN: 'authentication/API_POST_TOKEN' = 'authentication/API_POST_TOKEN';
export const API_DELETE_TOKEN: 'authentication/API_DELETE_TOKEN' = 'authentication/API_DELETE_TOKEN';

export const API_POST_USERS: 'authentication/API_POST_USERS' = 'authentication/API_POST_USERS';

export const API_POST_PASSWORD: 'authentication/API_POST_PASSWORD' = 'authentication/API_POST_PASSWORD';

export const API_POST_CONFIRMATION: 'authentication/API_POST_CONFIRMATION' = 'authentication/API_POST_CONFIRMATION';

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
    token: ?Token,
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

export type ApiPostConfirmationAction = {
  type: typeof API_POST_CONFIRMATION,
  payload: {
    email: string,
  },
};

export type AuthenticationAction =
  | SetAccountAction
  | SetTokenAction;
