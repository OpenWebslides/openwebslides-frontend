// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import {
  CorruptedInternalStateError,
  InvalidArgumentError,
  NotYetImplementedError,
  UnsupportedOperationError,
} from 'errors';

import * as a from '../actionTypes';
import lib from '../lib';
import * as m from '../model';

const createNewContentItemFromPropsForType = (
  id: string,
  type: m.ContentItemType,
  propsForType: $Shape<m.AllPropsForAllTypes>,
): m.ContentItem => {
  const newContentItem: m.BaseContentItem = {
    id,
    type,
    isEditing: false,
  };

  if (_.includes(m.plainTextContentItemTypes, type)) {
    ((newContentItem: any): m.PlainTextContentItem).text = propsForType.text || '';
  }
  if (_.includes(m.taggableContentItemTypes, type)) {
    ((newContentItem: any): m.TaggableContentItem).metadata = {
      tags: [],
      visibilityOverrides: {},
    };
  }
  if (_.includes(m.subableContentItemTypes, type)) {
    ((newContentItem: any): m.SubableContentItem).subItemIds = [];
  }

  switch (type) {
    case m.contentItemTypes.HEADING:
      // Extra heading props should be processed here.
      break;
    case m.contentItemTypes.PARAGRAPH:
      // Extra paragraph props should be processed here.
      break;
    case m.contentItemTypes.ROOT:
      // Extra root props should be processed here.
      break;
    case m.contentItemTypes.BLOCKQUOTE:
      // Extra blockquote props should be processed here.
      ((newContentItem: any): m.BlockquoteContentItem).cite = propsForType.cite;
      ((newContentItem: any): m.BlockquoteContentItem).href = propsForType.href;
      break;
    case m.contentItemTypes.LIST:
    case m.contentItemTypes.CODE:
    case m.contentItemTypes.IMAGE:
    case m.contentItemTypes.VIDEO:
    case m.contentItemTypes.AUDIO:
    case m.contentItemTypes.IFRAME:
    case m.contentItemTypes.SLIDE_BREAK:
    case m.contentItemTypes.COURSE_BREAK:
      throw new NotYetImplementedError(`ContentItem type not supported yet.`);
    default:
      throw new InvalidArgumentError(`Invalid contentItem type. Type was: "${type}"`);
  }

  return ((newContentItem: any): m.ContentItem);
};

const addToState = (
  state: m.ContentItemsState,
  action: a.AddToStateAction,
): m.ContentItemsState => {
  let newState: m.ContentItemsState = { ...state };

  const { id, type, context, propsForType } = action.payload;
  const newContentItem = createNewContentItemFromPropsForType(id, type, propsForType);

  newState = {
    ...newState,
    byId: {
      ...newState.byId,
      [id]: newContentItem,
    },
  };

  if (context == null) {
    if (type !== m.contentItemTypes.ROOT) {
      throw new InvalidArgumentError(`Adding a new contentItem of a type other than ROOT requires a context to be defined.`);
    }
  }
  else {
    const editedSuperItem = lib.edit.addSubItemIdToContext(
      context,
      newContentItem.id,
      state.byId,
    );

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [editedSuperItem.id]: editedSuperItem,
      },
    };

    try {
      lib.edit.validateSubItemsInContext(context, newState.byId);
    }
    catch (e) {
      if (e instanceof CorruptedInternalStateError) {
        throw new UnsupportedOperationError(e.message);
      }
      else {
        throw e;
      }
    }
  }

  return newState;
};

export default addToState;
