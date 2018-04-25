// @flow

import type { Identifier } from 'types/model';

import type { UserType } from './model';

import * as t from './actionTypes';

// Reducer actions
export const setItemInState = (
  item: ?UserType,
): t.SetItemInStateAction => {
  return {
    type: t.SET_ITEM_IN_STATE,
    payload: {
      item,
    },
  };
};

export const setItemsInState = (
  items: ?Array<UserType>,
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
export const apiGetUsers = (
  id: Identifier,
): t.ApiGetUsersAction => {
  return {
    type: t.API_GET_USERS,
    payload: {
      id,
    },
  };
};
