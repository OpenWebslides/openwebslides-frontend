// @flow
/**
 * Finds the siblingItem that comes immediately before the passed contentItem.
 * Note that 'siblings' refers to siblings of the same type; i.e. if the contentItem's
 * parentOrSuperItem is a parent- as well as a superItem, the returned siblings will be only its
 * subItems if the passed contentItem is a subItem, or only the childItems if the passed contentItem
 * is a childItem.
 */

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';
import find from '..';

const findPreviousSiblingItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;

  const context = find.extendedAncestorContext(contentItem, contentItemsById);
  if (context == null) return null;

  const { positionInSiblings, siblingItemIds } = context;

  if (positionInSiblings === 0) {
    return null;
  }
  else {
    const previousSiblingItem = contentItemsById[siblingItemIds[positionInSiblings - 1]];
    if (previousSiblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    return previousSiblingItem;
  }
};

export default findPreviousSiblingItem;
