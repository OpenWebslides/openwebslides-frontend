// @flow

/**
 * Finds the siblingItem that comes immediately before the passed contentItem.
 */

import { CorruptedInternalStateError } from 'errors';

import * as m from '../../../model';

import find from '..';

import { type SingleFindFunction } from '../types';

const findPreviousSiblingItem: SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.ContentItem => {
  if (contentItem == null) return null;

  const context = find.extendedSuperContext(contentItem, contentItemsById);
  if (context == null) return null;

  const { indexInSiblingItems, siblingItemIds } = context;

  if (indexInSiblingItems === 0) {
    return null;
  }
  else {
    const previousSiblingItem = contentItemsById[siblingItemIds[indexInSiblingItems - 1]];
    if (previousSiblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    return previousSiblingItem;
  }
};

export default findPreviousSiblingItem;
