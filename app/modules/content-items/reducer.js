// @flow

import _ from 'lodash';

import { dummyContentItemsById } from './dummyData';

import * as t from './actionTypes';
import {
  plainTextContentItemTypes,
  mediaContentItemTypes,
} from './model';
import type {
  MediaContentItem,
  PlainTextContentItem,
  ContentItemsState,
} from './model';

const initialState: ContentItemsState = {
  byId: dummyContentItemsById,
};

const add = (state: ContentItemsState, action: t.AddAction): ContentItemsState => {
  // #TODO stub
  return state;
};

const editPlainText = (
  state: ContentItemsState,
  action: t.EditPlainTextAction,
): ContentItemsState => {
  const { id, text } = action.payload;
  // eslint-disable-next-line flowtype/no-weak-types
  let editedContentItem: PlainTextContentItem = (state.byId[id]: any);

  if (editedContentItem == null) {
    throw new Error(`ContentItem with id "${id}" could not be found.`);
  }
  else if (!_.includes(plainTextContentItemTypes, editedContentItem.type)) {
    throw new Error(`ContentItem with id "${id}" is not a plainText contentItem. Its type is "${editedContentItem.type}".`);
  }

  if (text === null) throw new Error(`"text" prop cannot be NULL.`);
  else if (text !== undefined) editedContentItem = { ...editedContentItem, text };

  if (editedContentItem === state.byId[id]) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: editedContentItem,
      },
    };
  }
};

const editMedia = (state: ContentItemsState, action: t.EditMediaAction): ContentItemsState => {
  const { id, src, alt, caption } = action.payload;
  // eslint-disable-next-line flowtype/no-weak-types
  let editedContentItem: MediaContentItem = (state.byId[id]: any);

  if (editedContentItem == null) {
    throw new Error(`ContentItem with id "${id}" could not be found.`);
  }
  else if (!_.includes(mediaContentItemTypes, editedContentItem.type)) {
    throw new Error(`ContentItem with id "${id}" is not a media contentItem. Its type is "${editedContentItem.type}".`);
  }

  if (src === null) throw new Error(`"src" prop cannot be NULL.`);
  else if (src !== undefined) editedContentItem = { ...editedContentItem, src };
  if (alt === null) throw new Error(`"alt" prop cannot be NULL.`);
  else if (alt !== undefined) editedContentItem = { ...editedContentItem, alt };
  if (caption !== undefined) editedContentItem = { ...editedContentItem, caption };

  if (editedContentItem === state.byId[id]) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: editedContentItem,
      },
    };
  }
};

const remove = (state: ContentItemsState, action: t.RemoveAction): ContentItemsState => {
  // #TODO stub
  return state;
};

const set = (state: ContentItemsState, action: t.SetAction): ContentItemsState => {
  // #TODO stub
  return state;
};

const reducer = (
  state: ContentItemsState = initialState,
  action: t.ContentItemReducerAction,
): ContentItemsState => {
  switch (action.type) {
    case t.ADD:
      return add(state, action);
    case t.EDIT_PLAIN_TEXT:
      return editPlainText(state, action);
    case t.EDIT_MEDIA:
      return editMedia(state, action);
    case t.REMOVE:
      return remove(state, action);
    case t.SET:
      return set(state, action);
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
