// @flow

import type { UserType, UsersState } from './model';
import * as t from './actionTypes';

const initialState: UsersState = {};

const setItem = (state: UsersState, action: t.SetItemInStateAction): UsersState => {
  const { id } = action.payload.item;

  return {
    ...state,
    [id]: action.payload.item,
  };
};

const setItems = (state: UsersState, action: t.SetItemsInStateAction): UsersState => {
  const users = {};

  action.payload.items.forEach((item: UserType): void => {
    users[item.id] = item;
  });

  return {
    ...state,
    ...users,
  };
};

const reducer = (state: UsersState = initialState, action: t.UsersAction): UsersState => {
  switch (action.type) {
    case t.SET_ITEM_IN_STATE:
      return setItem(state, action);
    case t.SET_ITEMS_IN_STATE:
      return setItems(state, action);
    default:
      return state;
  }
};

export default reducer;
