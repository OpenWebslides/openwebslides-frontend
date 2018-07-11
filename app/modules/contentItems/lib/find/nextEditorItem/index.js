// @flow
/**
 * Finds the contentItem that comes directly after the passed contentItem in editor order.
 */

import * as m from '../../../model';

import find from '..';

import type { SingleFindFunction } from '../types';

const findClosestAncestorThatHasNextSiblingItem = (
  contentItem: m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.ContentItem => {
  let currentContentItem: m.ContentItem = contentItem;
  let candidateContext: ?m.ExtendedVerticalContext = find.extendedVerticalContext(
    currentContentItem,
    contentItemsById,
  );
  let closestValidAncestor: ?m.ContentItem = null;

  while (closestValidAncestor == null && candidateContext != null) {
    if (candidateContext.indexInSiblingItems !== candidateContext.siblingItemIds.length - 1) {
      closestValidAncestor = currentContentItem;
    }
    currentContentItem = contentItemsById[candidateContext.contextItemId];
    candidateContext = find.extendedVerticalContext(currentContentItem, contentItemsById);
  }

  return closestValidAncestor;
};

const findNextEditorItem: SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.ContentItem => {
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
