// @flow

import _ from 'lodash';
import * as t from './actionTypes';
import * as c from './constants';

export const signinEmail = (
  email: string,
  password: string,
): t.SigninEmailAction | t.SigninEmailErrorAction => {
  if (email !== 'john.doe@example.com' && password !== 'abcd1234') {
    return {
      type: t.SIGNIN_EMAIL_ERROR,
      error: {
        message: 'Email or password is invalid',
      },
    };
  }

  return {
    type: t.SIGNIN_EMAIL,
    payload: {
      email,
      password,
    },
  };
};

export const signinOauth = (
  email: string,
): t.SigninOAuthAction | t.SigninOAuthErrorAction => {
  if (email !== 'john.doe@example.com') {
    return {
      type: t.SIGNIN_OAUTH_ERROR,
      error: {
        message: 'Email is invalid',
      },
    };
  }

  return {
    type: t.SIGNIN_OAUTH,
    payload: {
      email,
    },
  };
};

export const signup = (
  email: string,
  password: string,
  firstName: string,
  lastName: ?string,
): t.SignupAction | t.SignupErrorAction => {
  const newEmail = _.trim(email);
  const newPassword = _.trim(password);
  const newFirstName = _.trim(firstName);

  if (newEmail === '') {
    return {
      type: t.SIGNUP_ERROR,
      error: {
        message: 'Email cannot be empty.',
      },
    };
  }

  if (newPassword.length < c.MIN_PASSWORD_LENGTH) {
    return {
      type: t.SIGNUP_ERROR,
      error: {
        message: `Password cannot be shorter than ${c.MIN_PASSWORD_LENGTH} characters.`,
      },
    };
  }

  if (newPassword.length > c.MAX_PASSWORD_LENGTH) {
    return {
      type: t.SIGNUP_ERROR,
      error: {
        message: `Password cannot be longer than ${c.MAX_PASSWORD_LENGTH} characters.`,
      },
    };
  }

  if (newFirstName === '') {
    return {
      type: t.SIGNUP_ERROR,
      error: {
        message: 'First name cannot be empty.',
      },
    };
  }

  return {
    type: t.SIGNUP,
    payload: {
      email: newEmail,
      password: newPassword,
      firstName: newFirstName,
      lastName,
    },
  };
};

export const signout = (
): t.SignoutAction | t.SignoutErrorAction => {
  return {
    type: t.SIGNOUT,
  };
};
