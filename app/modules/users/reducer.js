// @flow

import type { User, UsersState } from './model';
import * as t from './actionTypes';

const initialState: UsersState = {};

const addItem = (state: UsersState, action: t.AddToStateAction): UsersState => {
  const { id } = action.payload;

  return {
    ...state,
    [id]: action.payload,
  };
};

const setItem = (state: UsersState, action: t.SetItemInStateAction): UsersState => {
  const { id } = action.payload.item;

  return {
    ...state,
    [id]: action.payload.item,
  };
};

const setItems = (state: UsersState, action: t.SetItemsInStateAction): UsersState => {
  const users = {};

  action.payload.items.forEach((item: User): void => {
    users[item.id] = item;
  });

  return {
    ...state,
    ...users,
  };
};

const reducer = (state: UsersState = initialState, action: t.UsersAction): UsersState => {
  switch (action.type) {
    case t.ADD_TO_STATE:
      return addItem(state, action);
    case t.SET_ITEM_IN_STATE:
      return setItem(state, action);
    case t.SET_ITEMS_IN_STATE:
      return setItems(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export default reducer;
