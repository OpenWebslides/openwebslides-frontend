// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import insertIntoArray from 'lib/insertIntoArray';

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import {
  contentItemTypes,
  plainTextContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
  contextTypes,
} from '../model';
import type {
  BaseContentItem,
  PlainTextContentItem,
  TaggableContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsState,
} from '../model';

const addToState = (
  state: ContentItemsState,
  action: t.AddToStateAction,
): ContentItemsState => {
  const { id, type, context, propsForType } = action.payload;
  const newContentItem: BaseContentItem = {
    id,
    type,
    isEditing: false,
  };
  let newState: ContentItemsState = { ...state };

  if (_.includes(plainTextContentItemTypes, type)) {
    ((newContentItem: any): PlainTextContentItem).text = (propsForType: Object).text;
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
    const positionInSiblings = context.positionInSiblings || 0;
    const contextItemToEdit = state.byId[context.contextItemId];
    if (contextItemToEdit == null) {
      throw new ObjectNotFoundError('contentItems:contentItem', id);
    }
    let editedContextItem: any = { ...contextItemToEdit };

    if (context.contextType === contextTypes.PARENT) {
      if (!_.includes(containerContentItemTypes, editedContextItem.type)) {
        throw new InvalidArgumentError(`Can't add a child item to a contentItem that is not a container.`);
      }
      editedContextItem = (editedContextItem: ContainerContentItem);
      editedContextItem.childItemIds = insertIntoArray(
        editedContextItem.childItemIds,
        newContentItem.id,
        positionInSiblings,
      );
    }
    else if (context.contextType === contextTypes.SUPER) {
      if (!_.includes(subableContentItemTypes, editedContextItem.type)) {
        throw new InvalidArgumentError(`Can't add a sub item to a contentItem that is not subable.`);
      }
      editedContextItem = (editedContextItem: SubableContentItem);
      editedContextItem.subItemIds = insertIntoArray(
        editedContextItem.subItemIds,
        newContentItem.id,
        positionInSiblings,
      );
    }
    else {
      throw new InvalidArgumentError(`Invalid contexType. ContextType was "${context.contextType}"`);
    }

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [editedContextItem.id]: editedContextItem,
      },
    };
  }

  return newState;
};

export default addToState;
