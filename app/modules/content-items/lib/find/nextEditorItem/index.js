// @flow
/**
 * Finds the contentItem that comes directly after the passed contentItem in editor order.
 */

import type {
  ContentItem,
  ContentItemsById,
  ExtendedAncestorContext,
} from '../../../model';
import find from '..';

const findClosestAncestorThatHasNextSiblingItem = (
  contentItem: ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  let currentContentItem: ContentItem = contentItem;
  let candidateContext: ?ExtendedAncestorContext = find.extendedAncestorContext(
    currentContentItem,
    contentItemsById,
  );
  let closestValidAncestor: ?ContentItem = null;

  while (closestValidAncestor == null && candidateContext != null) {
    if (candidateContext.positionInSiblings !== candidateContext.siblingItemIds.length - 1) {
      closestValidAncestor = currentContentItem;
    }
    currentContentItem = contentItemsById[candidateContext.contextItemId];
    candidateContext = find.extendedAncestorContext(currentContentItem, contentItemsById);
  }

  return closestValidAncestor;
};

const findNextEditorItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;

  // First, see if the contentItem has subItems or childItems.
  const allChildOrSubItems = find.allChildOrSubItems(contentItem, contentItemsById);

  // If so, return the first sub- or childItem.
  if (allChildOrSubItems.length !== 0) {
    return allChildOrSubItems[0];
  }
  // If the contentItem has no sub- or childItems
  else {
    // Find the closest ancestor for which the previous ancestor on the path is not the last in
    // its list of siblings.
    const closestValidAncestor = findClosestAncestorThatHasNextSiblingItem(
      contentItem,
      contentItemsById,
    );

    if (closestValidAncestor == null) {
      return null;
    }
    else {
      return find.nextSiblingItem(closestValidAncestor, contentItemsById);
    }
  }
};

export default findNextEditorItem;
