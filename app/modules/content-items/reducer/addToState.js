// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../actionTypes';
import {
  contentItemTypes,
  plainTextContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
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
      throw new NotYetImplementedError(`ContentItem type not supported yet.`);
    default:
      throw new InvalidArgumentError(`Invalid contentItem type. Type was: "${type}"`);
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: newContentItem,
    },
  };
};

export default addToState;
