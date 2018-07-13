// @flow
/* eslint-disable flowtype/no-weak-types */
/**
 * Finds all direct child- and subItems of the passed contentItem. If the passed contentItem is
 * a parentItem as well as a superItem, the childItems will come before the subItems.
 */

import { CorruptedInternalStateError } from 'errors';
import type { Identifier } from 'types/model';

import * as m from '../../../model';
import type { MultipleFindFunction } from '../types';

const findAllChildOrSubItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): Array<m.ContentItem> => {
  if (contentItem == null) return [];

  const allChildOrSubItemIds = [];

  if (contentItem.childItemIds != null) {
    allChildOrSubItemIds.push(...((contentItem: any): m.ContainerContentItem).childItemIds);
  }
  if (contentItem.subItemIds != null) {
    allChildOrSubItemIds.push(...((contentItem: any): m.SubableContentItem).subItemIds);
  }

  return allChildOrSubItemIds.map((childOrSubItemId: Identifier): m.ContentItem => {
    const childOrSubItem = contentItemsById[childOrSubItemId];
    if (childOrSubItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);
    return childOrSubItem;
  });
};

export default findAllChildOrSubItems;
