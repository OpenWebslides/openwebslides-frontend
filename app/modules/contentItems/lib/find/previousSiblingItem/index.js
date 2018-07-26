// @flow

/**
 * Finds the siblingItem that comes immediately before the passed contentItem.
 * Note that 'siblings' refers to siblings of the same type; i.e. if the contentItem's
 * parentOrSuperItem is a parent- as well as a superItem, the returned siblings will be only its
 * subItems if the passed contentItem is a subItem, or only the childItems if the passed contentItem
 * is a childItem.
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

  const context = find.extendedVerticalContext(contentItem, contentItemsById);
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
