// @flow

import _ from 'lodash';

import type { Token } from 'lib/api';

import type { User } from 'modules/users';

import * as t from './actionTypes';
import * as c from './constants';

// Reducer actions
export const setAccountInState = (
  account: ?User,
): t.SetAccountAction => {
  return {
    type: t.SET_ACCOUNT,
    payload: {
      account,
    },
  };
};

export const setTokenInState = (
  token: ?Token,
): t.SetTokenAction => {
  return {
    type: t.SET_TOKEN,
    payload: {
      token,
    },
  };
};

// Task saga actions
export const signinEmail = (
  email: string,
  password: string,
): t.SigninEmailAction => {
  const newEmail = _.trim(email);
  const newPassword = _.trim(password);

  if (newEmail === '') {
    throw new Error(`"email" prop cannot be an empty string`);
  }

  if (newPassword === '') {
    throw new Error(`"password" prop cannot be an empty string`);
  }

  return {
    type: t.SIGNIN_EMAIL,
    payload: {
      email: newEmail,
      password: newPassword,
    },
  };
};

export const signout = (
): t.SignoutAction => {
  return {
    type: t.SIGNOUT,
  };
};

export const signup = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): t.SignupAction => {
  const newEmail = _.trim(email);
  const newPassword = _.trim(password);
  const newFirstName = _.trim(firstName);
  const newLastName = _.trim(lastName);

  if (newEmail === '') {
    throw new Error(`"email" prop cannot be an empty string`);
  }

  if (newPassword.length < c.MIN_PASSWORD_LENGTH) {
    throw new Error(`"password" prop cannot be shorter than ${c.MIN_PASSWORD_LENGTH} characters.`);
  }

  if (newPassword.length > c.MAX_PASSWORD_LENGTH) {
    throw new Error(`"password" prop cannot be longer than ${c.MAX_PASSWORD_LENGTH} characters.`);
  }

  if (newFirstName === '') {
    throw new Error(`"firstName" prop cannot be an empty string`);
  }

  if (tosAccepted !== true) {
    throw new Error(`"tosAccepted" prop must be true`);
  }

  return {
    type: t.SIGNUP,
    payload: {
      email: newEmail,
      password: newPassword,
      firstName: newFirstName,
      lastName: newLastName,
      tosAccepted,
    },
  };
};

export const reset = (
  email: string,
): t.ResetAction => {
  const newEmail = _.trim(email);

  if (newEmail === '') {
    throw new Error(`"email" prop cannot be an empty string`);
  }

  return {
    type: t.RESET,
    payload: {
      email: newEmail,
    },
  };
};

export const confirm = (
  email: string,
): t.ConfirmAction => {
  const newEmail = _.trim(email);

  if (newEmail === '') {
    throw new Error(`"email" prop cannot be an empty string`);
  }

  return {
    type: t.CONFIRM,
    payload: {
      email: newEmail,
    },
  };
};

// API saga actions
export const apiPostToken = (
  email: string,
  password: string,
): t.ApiPostTokenAction => {
  return {
    type: t.API_POST_TOKEN,
    payload: {
      email,
      password,
    },
  };
};

export const apiDeleteToken = (
): t.ApiDeleteTokenAction => {
  return {
    type: t.API_DELETE_TOKEN,
  };
};

export const apiPostUsers = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): t.ApiPostUsersAction => {
  return {
    type: t.API_POST_USERS,
    payload: {
      email,
      firstName,
      lastName,
      password,
      tosAccepted,
    },
  };
};

export const apiPostPassword = (
  email: string,
): t.ApiPostPasswordAction => {
  return {
    type: t.API_POST_PASSWORD,
    payload: {
      email,
    },
  };
};

export const apiPostConfirmation = (
  email: string,
): t.ApiPostConfirmationAction => {
  return {
    type: t.API_POST_CONFIRMATION,
    payload: {
      email,
    },
  };
};
