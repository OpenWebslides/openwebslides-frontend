// @flow
/**
 * Finds all ancestors (i.e. parent, grandparent, and so on) of the passed contentItem.
 * The ancestors are ordered from closest to furthest from the passed contentItem.
 */

import * as m from '../../../model';
import find from '..';
import type { MultipleFindFunction } from '../types';

const findAllAncestorItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): Array<m.ContentItem> => {
  if (contentItem == null) return [];

  const allAncestorItems: Array<m.ContentItem> = [];
  let parentOrSuperItem: ?m.ContentItem = contentItem;

  while (parentOrSuperItem !== null) {
    parentOrSuperItem = find.parentOrSuperItem(parentOrSuperItem, contentItemsById);
    if (parentOrSuperItem != null) allAncestorItems.push(parentOrSuperItem);
  }

  return allAncestorItems;
};

export default findAllAncestorItems;
