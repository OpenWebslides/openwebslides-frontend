// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import * as model from '../model';
import edit from '../lib/edit';

const {
  contentItemTypes,
  plainTextContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
  ContentItem,
  BaseContentItem,
  PlainTextContentItem,
  TaggableContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsState,
  ContentItemType,
  AllPropsForAllTypes,
} = model;

const createNewContentItemFromPropsForType = (
  id: Identifier,
  type: ContentItemType,
  propsForType: $Shape<AllPropsForAllTypes>,
): ContentItem => {
  const newContentItem: BaseContentItem = {
    id,
    type,
    isEditing: false,
  };

  if (_.includes(plainTextContentItemTypes, type)) {
    ((newContentItem: any): PlainTextContentItem).text = propsForType.text || '';
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
      // Extra root props should be processed here.
      break;
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
      throw new NotYetImplementedError(`ContentItem type not supported yet.`);
    default:
      throw new InvalidArgumentError(`Invalid contentItem type. Type was: "${type}"`);
  }

  return ((newContentItem: any): ContentItem);
};

const addToState = (
  state: ContentItemsState,
  action: t.AddToStateAction,
): ContentItemsState => {
  let newState: ContentItemsState = { ...state };

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
    if (type !== contentItemTypes.ROOT) {
      throw new InvalidArgumentError(`Adding a new contentItem of a type other than ROOT requires a context to be defined.`);
    }
  }
  else {
    const editedParentOrSuperItem = edit.addChildOrSubItemIdToContext(
      context,
      newContentItem.id,
      state.byId,
    );

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [editedParentOrSuperItem.id]: editedParentOrSuperItem,
      },
    };

    try {
      edit.validateChildOrSubItemsInContext(context, newState.byId);
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
