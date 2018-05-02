// @flow

import type { Identifier } from 'types/model';

import type { UserType } from './model';

import * as t from './actionTypes';

// Reducer actions
export const setItemInState = (
  item: UserType,
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
  items: Array<UserType>,
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
  id: Identifier,
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
  id: Identifier,
): t.ApiGetUserAction => {
  return {
    type: t.API_GET_USER,
    payload: {
      id,
    },
  };
};
