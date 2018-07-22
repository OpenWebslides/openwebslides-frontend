// @flow

import * as t from './actionTypes';
import type { User } from './model';

// Reducer actions
export const addToState = (
  id: string,
  firstName: string,
  lastName: ?string,
  email: ?string,
): t.AddToStateAction => {
  const newEmail = email != null ? email : '';

  return {
    type: t.ADD_TO_STATE,
    payload: {
      id,
      firstName,
      lastName,
      email: newEmail,
    },
  };
};

export const setItemInState = (
  item: User,
): t.SetItemInStateAction => {
  const {
    id,
    email,
    firstName,
    lastName,
  } = item;

  const newEmail = email != null ? email : '';

  const newItem = {
    id,
    newEmail,
    firstName,
    lastName,
  };

  return {
    type: t.SET_ITEM_IN_STATE,
    payload: {
      item: newItem,
    },
  };
};

export const setItemsInState = (
  items: Array<User>,
): t.SetItemsInStateAction => {
  return {
    type: t.SET_ITEMS_IN_STATE,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const get = (
  id: string,
): t.GetAction => {
  return {
    type: t.GET,
    payload: {
      id,
    },
  };
};

// API saga actions
export const apiGetUser = (
  id: string,
): t.ApiGetUserAction => {
  return {
    type: t.API_GET_USER,
    payload: {
      id,
    },
  };
};

export const apiPostUser = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): t.ApiPostUserAction => {
  return {
    type: t.API_POST_USER,
    payload: {
      email,
      firstName,
      lastName,
      password,
      tosAccepted,
    },
  };
};
