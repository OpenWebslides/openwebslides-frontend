// @flow

import _ from 'lodash';

import * as at from './actionTypes';
import { generateId } from './model';

export const add = (
  firstName: string,
  lastName: ?string = null,
  email: string,
  password: string,
): at.AddAction | at.AddErrorAction => {
  const newId = generateId();
  const newFirstName = _.trim(firstName);
  const newLastName = (lastName == null) ? '' : _.trim(lastName);
  const newEmail = _.trim(email);
  const newPassword = _.trim(password);

  if (newFirstName === '') {
    return {
      type: at.ADD_ERROR,
      error: { // TODO: figure out how to do i18n for these messages
        message: 'First name cannot be empty.',
      },
    };
  }
  if (newEmail === '') {
    return {
      type: at.ADD_ERROR,
      error: {
        message: 'Email cannot be empty.',
      },
    };
  }

  if (newPassword === '') {
    return {
      type: at.ADD_ERROR,
      error: {
        message: 'Password cannot be empty.',
      },
    };
  }

  return {
    type: at.ADD,
    payload: {
      id: newId,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
    },
  };
};
