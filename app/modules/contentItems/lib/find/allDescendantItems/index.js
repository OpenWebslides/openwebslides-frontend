// @flow

/**
 * Finds all descendants (i.e. nested subItems) for the passed contentItem.
 * Descendants are ordered like they would appear in the editor; i.e. each subItem of the passed
 * contentItem is immediately followed by its own nested descendants.
 */

import * as m from '../../../model';

import find from '..';

import { type MultipleFindFunction } from '../types';

const findAllDescendantItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): $ReadOnlyArray<m.ContentItem> => {
  if (contentItem == null) return [];

  const allSubItems = find.allSubItems(contentItem, contentItemsById);
  const allDescendantItems = [];

  allSubItems.forEach((subItem: m.ContentItem): void => {
    allDescendantItems.push(subItem);
    allDescendantItems.push(...(findAllDescendantItems(subItem, contentItemsById)));
  });

  return allDescendantItems;
};

export default findAllDescendantItems;
