// @flow

import type { Identifier } from 'types/model';
import type { User } from './model';

/* Action constants */

// Reducer actions
export const ADD_TO_STATE: 'users/ADD_TO_STATE' = 'users/ADD_TO_STATE';
export const SET_ITEM_IN_STATE: 'users/SET_ITEM_IN_STATE' = 'users/SET_ITEM_IN_STATE';
export const SET_ITEMS_IN_STATE: 'users/SET_ITEMS_IN_STATE' = 'users/SET_ITEMS_IN_STATE';

// Task saga actions
export const GET: 'users/GET' = 'users/GET';

// API saga actions
export const API_GET_USER: 'users/API_GET_USER' = 'users/API_GET_USER';

/* Action types */

// Reducer actions
export type AddToStateAction = {
  type: typeof ADD_TO_STATE,
  payload: {
    id: Identifier,
    firstName: string,
    lastName: ?string,
    email: ?string,
  },
};

export type SetItemInStateAction = {
  type: typeof SET_ITEM_IN_STATE,
  payload: {
    item: User,
  },
};

export type SetItemsInStateAction = {
  type: typeof SET_ITEMS_IN_STATE,
  payload: {
    items: Array<User>,
  },
};

// Task saga actions
export type GetAction = {
  type: typeof GET,
  payload: {
    id: Identifier,
  },
};

// API saga actions
export type ApiGetUserAction = {
  type: typeof API_GET_USER,
  payload: {
    id: Identifier,
  },
};

export type UsersAction =
  | AddToStateAction
  | SetItemInStateAction
  | SetItemsInStateAction;
