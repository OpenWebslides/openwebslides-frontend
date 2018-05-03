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

const addToState = (
  state: ContentItemsState,
  action: t.AddToStateAction,
): ContentItemsState => {
  // #TODO stub
  return state;
};

const editPlainTextInState = (
  state: ContentItemsState,
  action: t.EditPlainTextInStateAction,
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

const editMediaInState = (
  state: ContentItemsState,
  action: t.EditMediaInStateAction,
): ContentItemsState => {
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

const removeFromState = (
  state: ContentItemsState,
  action: t.RemoveFromStateAction,
): ContentItemsState => {
  // #TODO stub
  return state;
};

const setInState = (
  state: ContentItemsState,
  action: t.SetInStateAction,
): ContentItemsState => {
  // #TODO stub
  return state;
};

const setMultipleInState = (
  state: ContentItemsState,
  action: t.SetMultipleInStateAction,
): ContentItemsState => {
  // #TODO stub
  return state;
};

const reducer = (
  state: ContentItemsState = initialState,
  action: t.ReducerAction,
): ContentItemsState => {
  switch (action.type) {
    case t.ADD_TO_STATE:
      return addToState(state, action);
    case t.EDIT_PLAIN_TEXT_IN_STATE:
      return editPlainTextInState(state, action);
    case t.EDIT_MEDIA_IN_STATE:
      return editMediaInState(state, action);
    case t.REMOVE_FROM_STATE:
      return removeFromState(state, action);
    case t.SET_IN_STATE:
      return setInState(state, action);
    case t.SET_MULTIPLE_IN_STATE:
      return setMultipleInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
