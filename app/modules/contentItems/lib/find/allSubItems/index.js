// @flow

/* eslint-disable flowtype/no-weak-types */
/**
 * Finds all direct subItems of the passed contentItem.
 */

import { CorruptedInternalStateError } from 'errors';

import * as m from '../../../model';
import { type MultipleFindFunction } from '../types';

const findAllSubItems: MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): $ReadOnlyArray<m.ContentItem> => {
  if (contentItem == null || contentItem.subItemIds == null) return [];

  return contentItem.subItemIds.map((subItemId: string): m.ContentItem => {
    const subItem = contentItemsById[subItemId];
    if (subItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);
    return subItem;
  });
};

export default findAllSubItems;
