// @flow

import { dummyContentItemsById } from './dummyData';

import * as t from './actionTypes';
import type { ContentItemsState } from './model';

const initialState: ContentItemsState = {
  byId: dummyContentItemsById,
};

// eslint-disable-next-line no-unused-vars
const add = (state: ContentItemsState, action: t.AddAction): ContentItemsState => {
  // #TODO stub
  return state;
};

// eslint-disable-next-line no-unused-vars
const edit = (state: ContentItemsState, action: t.EditAction): ContentItemsState => {
  // #TODO stub
  return state;
};

// eslint-disable-next-line no-unused-vars
const remove = (state: ContentItemsState, action: t.RemoveAction): ContentItemsState => {
  // #TODO stub
  return state;
};

const reducer = (
  state: ContentItemsState = initialState,
  action: t.ContentItemAction,
): ContentItemsState => {
  switch (action.type) {
    case t.ADD:
      return add(state, action);
    case t.EDIT:
      return edit(state, action);
    case t.REMOVE:
      return remove(state, action);
    case t.ADD_ERROR:
    case t.EDIT_ERROR:
    case t.REMOVE_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
