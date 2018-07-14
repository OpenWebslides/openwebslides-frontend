// @flow

import type { Token } from 'lib/ApiRequest';
import type { User } from 'modules/users';

/* Action constants */

// Reducer actions
export const SET_ACCOUNT: 'auth/SET_ACCOUNT' = 'auth/SET_ACCOUNT';
export const SET_TOKEN: 'auth/SET_TOKEN' = 'auth/SET_TOKEN';

// Task saga actions
export const SIGNIN_EMAIL: 'auth/SIGNIN_EMAIL' = 'auth/SIGNIN_EMAIL';
export const SIGNOUT: 'auth/SIGNOUT' = 'auth/SIGNOUT';
export const SIGNUP: 'auth/SIGNUP' = 'auth/SIGNUP';
export const RESET: 'auth/RESET' = 'auth/RESET';
export const CONFIRM: 'auth/CONFIRM' = 'auth/CONFIRM';

// API saga actions
export const API_POST_TOKEN: 'auth/API_POST_TOKEN' = 'auth/API_POST_TOKEN';
export const API_DELETE_TOKEN: 'auth/API_DELETE_TOKEN' = 'auth/API_DELETE_TOKEN';

export const API_POST_USERS: 'auth/API_POST_USERS' = 'auth/API_POST_USERS';

export const API_POST_PASSWORD: 'auth/API_POST_PASSWORD' = 'auth/API_POST_PASSWORD';

export const API_POST_CONFIRMATION: 'auth/API_POST_CONFIRMATION' = 'auth/API_POST_CONFIRMATION';

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
