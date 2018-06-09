// @flow
/**
 * Finds the contentItem that comes directly before the passed contentItem in editor order.
 */

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';
import find from '..';

const findPreviousEditorItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;

  const context = find.extendedAncestorContext(contentItem, contentItemsById);
  if (context == null) return null;

  const { contextItemId, siblingItemIds, positionInSiblings } = context;
  const parentOrSuperItem = contentItemsById[contextItemId];

  // If the contentItem is the first in its list of siblings,
  // the previous item is its parentOrSuperItem.
  if (positionInSiblings == null || positionInSiblings === 0) {
    return parentOrSuperItem;
  }
  // If the contentItem is not the first in its list of siblings,
  // the previous item is the last nested child or subItem of its previous sibling.
  else {
    const previousSiblingId = siblingItemIds[context.positionInSiblings - 1];
    const previousSibling = contentItemsById[previousSiblingId];
    if (previousSibling == null) throw new CorruptedInternalStateError(`ContentItemsById contains inconsistencies; this shouldn't happen.`);

    const previousSiblingFurthestLastChildOrSubItem = find.furthest(
      previousSibling,
      contentItemsById,
      find.lastChildOrSubItem,
    );

    return previousSiblingFurthestLastChildOrSubItem || previousSibling;
  }
};

export default findPreviousEditorItem;
