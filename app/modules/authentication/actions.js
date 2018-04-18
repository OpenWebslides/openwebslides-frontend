// @flow

import _ from 'lodash';
import * as t from './actionTypes';
import * as c from './constants';

export const signinEmail = (
  email: string,
  password: string,
): t.SigninEmailAction | t.SigninEmailErrorAction => {
  const newEmail = _.trim(email);
  const newPassword = _.trim(password);

  if (newEmail === '') {
    return {
      type: t.SIGNIN_EMAIL_ERROR,
      error: {
        message: 'Email cannot be empty.',
      },
    };
  }

  if (newPassword === '') {
    return {
      type: t.SIGNIN_EMAIL_ERROR,
      error: {
        message: 'Password cannot be empty.',
      },
    };
  }

  return {
    type: t.SIGNIN_EMAIL,
    payload: {
      email: newEmail,
      password: newPassword,
    },
  };
};

export const signinOAuth = (
  email: string,
): t.SigninOAuthAction | t.SigninOAuthErrorAction => {
  const newEmail = _.trim(email);

  if (newEmail === '') {
    return {
      type: t.SIGNIN_OAUTH_ERROR,
      error: {
        message: 'Email cannot be empty.',
      },
    };
  }

  return {
    type: t.SIGNIN_OAUTH,
    payload: {
      email: newEmail,
    },
  };
};

export const signout = (
): t.SignoutAction | t.SignoutErrorAction => {
  return {
    type: t.SIGNOUT,
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
      lastName: lastName || null,
    },
  };
};

export const reset = (
  email: string,
): t.ResetAction => {
  const newEmail = _.trim(email);

  if (newEmail === '') {
    return {
      type: t.RESET_ERROR,
      error: {
        message: 'Email cannot be empty.',
      },
    };
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
    return {
      type: t.CONFIRM_ERROR,
      error: {
        message: 'Email cannot be empty.',
      },
    };
  }

  return {
    type: t.CONFIRM,
    payload: {
      email: newEmail,
    },
  };
};

export const updateToken = (
  token: string,
): t.UpdateTokenAction => {
  return {
    type: t.UPDATE_TOKEN,
    payload: {
      token,
    },
  };
};
