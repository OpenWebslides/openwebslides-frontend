// @flow

/**
 * Finds the siblingItem that comes immediately after the passed contentItem.
 */

import { CorruptedInternalStateError } from 'errors';

import * as m from '../../../model';

import find from '..';

import { type SingleFindFunction } from '../types';

const findNextSiblingItem: SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.ContentItem => {
  if (contentItem == null) return null;

  const context = find.extendedSuperContext(contentItem, contentItemsById);
  if (context == null) return null;

  const { indexInSiblingItems, siblingItemIds } = context;

  if (indexInSiblingItems === siblingItemIds.length - 1) {
    return null;
  }
  else {
    const nextSiblingItem = contentItemsById[siblingItemIds[indexInSiblingItems + 1]];
    if (nextSiblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    return nextSiblingItem;
  }
};

export default findNextSiblingItem;
