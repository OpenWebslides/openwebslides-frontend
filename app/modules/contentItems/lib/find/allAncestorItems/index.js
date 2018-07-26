// @flow

/**
 * Finds all ancestors (i.e. parent, grandparent, and so on) of the passed contentItem.
 * The ancestors are ordered from closest to furthest from the passed contentItem.
 */

import * as m from '../../../model';

import find from '..';

import { type MultipleFindFunction } from '../types';

const findAllAncestorItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): $ReadOnlyArray<m.ContentItem> => {
  if (contentItem == null) return [];

  let allAncestorItems: $ReadOnlyArray<m.ContentItem> = [];
  let parentOrSuperItem: ?m.ContentItem = contentItem;

  while (parentOrSuperItem !== null) {
    parentOrSuperItem = find.parentOrSuperItem(parentOrSuperItem, contentItemsById);
    if (parentOrSuperItem != null) {
      allAncestorItems = allAncestorItems.concat([parentOrSuperItem]);
    }
  }

  return allAncestorItems;
};

export default findAllAncestorItems;
