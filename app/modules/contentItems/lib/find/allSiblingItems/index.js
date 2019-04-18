// @flow

/**
 * Finds all siblings of the passed contentItem.
 * The siblings are ordered the same as in the superItem's subItemIds array.
 */

import { CorruptedInternalStateError } from 'errors';

import * as m from '../../../model';

import find from '..';

import { type MultipleFindFunction } from '../types';

const findAllSiblingItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): $ReadOnlyArray<m.ContentItem> => {
  if (contentItem == null) return [];

  const extendedSuperContext = find.extendedSuperContext(contentItem, contentItemsById);
  if (extendedSuperContext == null) return [];

  const siblingItems = extendedSuperContext.siblingItemIds.map((
    siblingItemId: string,
  ): m.ContentItem => {
    const siblingItem = contentItemsById[siblingItemId];
    if (siblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);
    return siblingItem;
  });

  return siblingItems;
};

export default findAllSiblingItems;
