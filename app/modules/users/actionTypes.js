// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';

export const ADD: 'users/ADD' = 'users/ADD';

export const ADD_ERROR: 'users/ADD_ERROR' = 'users/ADD_ERROR';

export type AddAction = {
  type: typeof ADD,
  payload: {
    id: Identifier,
    firstName: string,
    lastName: ?string,
    email: string,
    password: string,
  },
};

export type AddErrorAction = {
  type: typeof ADD_ERROR,
  error: Error,
};

export type UserAction =
  | AddAction
  | AddErrorAction;
