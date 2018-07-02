// @flow
/**
 * Finds all ancestors (i.e. parent, grandparent, and so on) of the passed contentItem.
 * The ancestors are ordered from closest to furthest from the passed contentItem.
 */

import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';
import find from '..';

const findAllAncestorItems = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): Array<ContentItem> => {
  if (contentItem == null) return [];

  const allAncestorItems: Array<ContentItem> = [];
  let parentOrSuperItem: ?ContentItem = contentItem;

  while (parentOrSuperItem !== null) {
    parentOrSuperItem = find.parentOrSuperItem(parentOrSuperItem, contentItemsById);
    if (parentOrSuperItem != null) allAncestorItems.push(parentOrSuperItem);
  }

  return allAncestorItems;
};

export default findAllAncestorItems;
