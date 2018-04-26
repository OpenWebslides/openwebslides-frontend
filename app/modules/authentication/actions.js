// @flow

import _ from 'lodash';

import type { UserType } from 'modules/users';

import * as t from './actionTypes';
import * as c from './constants';

// Reducer actions
export const setAccountInState = (
  account: ?UserType,
): t.SetAccountAction => {
  return {
    type: t.SET_ACCOUNT,
    payload: {
      account,
    },
  };
};

export const setTokenInState = (
  token: ?string,
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
): t.SignupAction | t.SignupErrorAction => {
  const newEmail = _.trim(email);
  const newPassword = _.trim(password);
  const newFirstName = _.trim(firstName);
  const newLastName = _.trim(lastName);

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

  if (tosAccepted !== true) {
    return {
      type: t.SIGNUP_ERROR,
      error: {
        message: 'ToS must be accepted.',
      },
    };
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
): t.ResetAction | t.ResetErrorAction => {
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
): t.ConfirmAction | t.ConfirmErrorAction => {
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
