// @flow
/**
 * Finds all descendants (i.e. nested child- and subItems) for the passed contentItem.
 * Descendants are ordered like they would appear in the editor; i.e. each child- or subItem
 * of the passed contentItem is immediately followed by its own nested descendants.
 */

import * as m from '../../../model';
import find from '..';
import type { MultipleFindFunction } from '../types';

const findAllDescendantItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): Array<m.ContentItem> => {
  if (contentItem == null) return [];

  const allChildOrSubItems = find.allChildOrSubItems(contentItem, contentItemsById);
  const allDescendantItems = [];

  allChildOrSubItems.forEach((childOrSubItem: m.ContentItem): void => {
    allDescendantItems.push(childOrSubItem);
    allDescendantItems.push(...(findAllDescendantItems(childOrSubItem, contentItemsById)));
  });

  return allDescendantItems;
};

export default findAllDescendantItems;
