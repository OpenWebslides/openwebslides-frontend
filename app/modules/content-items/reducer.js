// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import { dummyContentItemsById } from './dummyData';

import * as t from './actionTypes';
import {
  contentItemTypes,
  plainTextContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
} from './model';
import type {
  BaseContentItem,
  PlainTextContentItem,
  TaggableContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsState,
} from './model';

const initialState: ContentItemsState = {
  byId: dummyContentItemsById,
};

const addToState = (
  state: ContentItemsState,
  action: t.AddToStateAction,
): ContentItemsState => {
  const { id, type, props } = action.payload;
  const newContentItem: BaseContentItem = {
    id,
    type,
  };

  if (_.includes(plainTextContentItemTypes, type)) {
    ((newContentItem: any): PlainTextContentItem).text = (props: Object).text;
  }

  if (_.includes(taggableContentItemTypes, type)) {
    ((newContentItem: any): TaggableContentItem).metadata = {
      tags: [],
      visibilityOverrides: {},
    };
  }

  if (_.includes(subableContentItemTypes, type)) {
    ((newContentItem: any): SubableContentItem).subItemIds = [];
  }

  if (_.includes(containerContentItemTypes, type)) {
    ((newContentItem: any): ContainerContentItem).childItemIds = [];
  }

  switch (type) {
    case contentItemTypes.HEADING:
      // Extra heading props should be processed here.
      break;
    case contentItemTypes.PARAGRAPH:
      // Extra paragraph props should be processed here.
      break;
    case contentItemTypes.ROOT:
    case contentItemTypes.LIST:
    case contentItemTypes.LIST_ITEM:
    case contentItemTypes.BLOCKQUOTE:
    case contentItemTypes.CODE:
    case contentItemTypes.IMAGE:
    case contentItemTypes.VIDEO:
    case contentItemTypes.AUDIO:
    case contentItemTypes.IFRAME:
    case contentItemTypes.SLIDE_BREAK:
    case contentItemTypes.COURSE_BREAK:
      throw new Error(`ContentItem type not supported yet.`);
    default:
      throw new Error(`Invalid contentItem type. Type was: "${type}"`);
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: newContentItem,
    },
  };
};

const editInState = (
  state: ContentItemsState,
  action: t.EditInStateAction,
): ContentItemsState => {
  const { id, type, props } = action.payload;
  const contentItemToEdit = state.byId[id];

  if (contentItemToEdit == null) {
    throw new Error(`ContentItem with id "${id}" could not be found.`);
  }

  if (contentItemToEdit.type !== type) {
    throw new Error(`The contentItem's type does not match the type passed in the action. The contentItem's type was: "${contentItemToEdit.type}". The type passed in the action was: "${type}".`);
  }

  const editedContentItem: any = { ...contentItemToEdit };

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text != null) (editedContentItem: PlainTextContentItem).text = props.text;
  }

  if (_.isEqual(editedContentItem, contentItemToEdit)) {
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
    case t.EDIT_IN_STATE:
      return editInState(state, action);
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
