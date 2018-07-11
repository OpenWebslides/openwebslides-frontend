// @flow
/* eslint-disable flowtype/no-weak-types */
/**
 * Finds all direct child- and subItems of the passed contentItem. If the passed contentItem is
 * a parentItem as well as a superItem, the childItems will come before the subItems.
 */

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import type { Identifier } from 'types/model';

import * as model from '../../../model';
import type { MultipleFindFunction } from '../types';

const {
  ContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsById,
} = model;

const findAllChildOrSubItems: MultipleFindFunction = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): Array<ContentItem> => {
  if (contentItem == null) return [];

  const allChildOrSubItemIds = [];

  if (contentItem.childItemIds != null) {
    allChildOrSubItemIds.push(...((contentItem: any): ContainerContentItem).childItemIds);
  }
  if (contentItem.subItemIds != null) {
    allChildOrSubItemIds.push(...((contentItem: any): SubableContentItem).subItemIds);
  }

  return allChildOrSubItemIds.map((childOrSubItemId: Identifier): ContentItem => {
    const childOrSubItem = contentItemsById[childOrSubItemId];
    if (childOrSubItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);
    return childOrSubItem;
  });
};

export default findAllChildOrSubItems;
