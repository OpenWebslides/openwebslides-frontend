// @flow
/**
 * Finds all ancestors (i.e. parent, grandparent, and so on) of the passed contentItem.
 * The ancestors are ordered from closest to furthest from the passed contentItem.
 */

import * as model from '../../../model';
import find from '..';
import type { MultipleFindFunction } from '../types';

const { ContentItem, ContentItemsById } = model;

const findAllAncestorItems: MultipleFindFunction = (
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
