// @flow

import * as a from './actionTypes';
import type { User } from './model';

// Reducer actions
export const addToState = (
  id: string,
  firstName: string,
  lastName: ?string,
  email: ?string,
): a.AddToStateAction => {
  const newEmail = email != null ? email : '';

  return {
    type: a.ADD_TO_STATE,
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
): a.SetItemInStateAction => {
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
    type: a.SET_ITEM_IN_STATE,
    payload: {
      item: newItem,
    },
  };
};

export const setItemsInState = (
  items: Array<User>,
): a.SetItemsInStateAction => {
  return {
    type: a.SET_ITEMS_IN_STATE,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const get = (
  id: string,
): a.GetAction => {
  return {
    type: a.GET,
    payload: {
      id,
    },
  };
};

// API saga actions
export const apiGetUser = (
  id: string,
): a.ApiGetUserAction => {
  return {
    type: a.API_GET_USER,
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
): a.ApiPostUserAction => {
  return {
    type: a.API_POST_USER,
    payload: {
      email,
      firstName,
      lastName,
      password,
      tosAccepted,
    },
  };
};
