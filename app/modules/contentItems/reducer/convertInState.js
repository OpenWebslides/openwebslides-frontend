// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import {
  InvalidArgumentError,
  NotYetImplementedError,
  ObjectNotFoundError,
  UnsupportedOperationError,
} from 'errors';

import * as a from '../actionTypes';
import lib from '../lib';
import * as m from '../model';

const supportedContentItemTypes = [
  m.contentItemTypes.HEADING,
  m.contentItemTypes.PARAGRAPH,
];

const convertInState = (
  state: m.ContentItemsState,
  action: a.ConvertInStateAction,
): m.ContentItemsState => {
  const { id, newType } = action.payload;

  // Find the contentItem for the passed id in the state.
  const contentItemToConvert = state.byId[id];
  if (contentItemToConvert == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Conversion is only supported for PlainText types.
  if (
    !_.includes(m.plainTextContentItemTypes, contentItemToConvert.type)
    || !_.includes(m.plainTextContentItemTypes, newType)
  ) {
    throw new UnsupportedOperationError('Only PlainText contentItems can be converted.');
  }

  // For now, only HEADING -> PARAGRAPH and PARAGRAPH -> HEADING conversion is supported.
  if (
    !_.includes(supportedContentItemTypes, contentItemToConvert.type)
    || !_.includes(supportedContentItemTypes, newType)
  ) {
    throw new NotYetImplementedError();
  }

  // Verify that the conversion is useful; i.e. that the newType isn't the same as the old type.
  if (contentItemToConvert.type === newType) {
    throw new InvalidArgumentError('Cannot convert a contentItem to the same type it already has.');
  }

  // Verify that the conversion wouldn't result in a HEADING becoming a descendant of a PARAGRAPH.
  if (newType === m.contentItemTypes.PARAGRAPH) {
    const allDescendantItems = lib.find.allDescendantItems(contentItemToConvert, state.byId);
    allDescendantItems.forEach((descendantItem: m.ContentItem): void => {
      if (descendantItem.type === m.contentItemTypes.HEADING) {
        throw new UnsupportedOperationError('Invalid conversion: HEADINGs cannot be descendants of PARAGRAPHs.');
      }
    });
  }

  // Convert the contentItem.
  const convertedContentItem = {
    ...contentItemToConvert,
    type: newType,
    // Note that no further logic is necessary since HEADING and PARAGRAPH are identical,
    // save for the type. More logic will be necessary when converting, for example, BLOCKQUOTEs.
    // TODO: implement some sort of contentItem validation that checks if all props are correct
  };

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: convertedContentItem,
    },
  };
};

export default convertInState;
