// @flow
/**
 * Finds all siblings of the passed contentItem.
 * Note that 'siblings' refers to siblings of the same type; i.e. if the contentItem's
 * parentOrSuperItem is a parent- as well as a superItem, the returned siblings will be only its
 * subItems if the passed contentItem is a subItem, or only the childItems if the passed contentItem
 * is a childItem.
 * The siblings are ordered the same as in the parent- or superItem's [child|sub]ItemIds array.
 */

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import type { Identifier } from 'types/model';

import * as m from '../../../model';
import find from '..';
import type { MultipleFindFunction } from '../types';

const findAllSiblingItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): Array<m.ContentItem> => {
  if (contentItem == null) return [];

  const extendedVerticalContext = find.extendedVerticalContext(contentItem, contentItemsById);
  if (extendedVerticalContext == null) return [];

  const siblingItems = extendedVerticalContext.siblingItemIds.map((
    siblingItemId: Identifier,
  ): m.ContentItem => {
    const siblingItem = contentItemsById[siblingItemId];
    if (siblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);
    return siblingItem;
  });

  return siblingItems;
};

export default findAllSiblingItems;
