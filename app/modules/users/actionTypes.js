// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';
import type { UserType } from './model';

/* Action constants */

// Reducer actions
export const SET_ITEM_IN_STATE: 'users/SET_ITEM_IN_STATE' = 'users/SET_ITEM_IN_STATE';
export const SET_ITEMS_IN_STATE: 'users/SET_ITEMS_IN_STATE' = 'users/SET_ITEMS_IN_STATE';

// Task saga actions
export const GET: 'users/GET' = 'users/GET';
export const GET_ERROR: 'users/GET_ERROR' = 'users/GET_ERROR';

// API saga actions
export const API_GET_USERS: 'users/API_GET_USERS' = 'users/API_GET_USERS';

/* Action types */

// Reducer actions
export type SetItemInStateAction = {
  type: typeof SET_ITEM_IN_STATE,
  payload: {
    item: UserType,
  },
};

export type SetItemsInStateAction = {
  type: typeof SET_ITEMS_IN_STATE,
  payload: {
    items: Array<UserType>,
  },
};

// Task saga actions
export type GetAction = {
  type: typeof GET,
  payload: {
    id: Identifier,
  },
};

export type GetErrorAction = {
  type: typeof GET_ERROR,
  error: Error,
};

// API saga actions
export type ApiGetUsersAction = {
  type: typeof API_GET_USERS,
  payload: {
    id: Identifier,
  },
};

export type UsersAction =
  | SetItemInStateAction
  | SetItemsInStateAction;
