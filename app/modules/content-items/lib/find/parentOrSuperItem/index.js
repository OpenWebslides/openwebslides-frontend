// @flow
/**
 * Finds the passed contentItem's parentItem if the passed contentItem is a childItem, or its
 * superItem if it is a subItem.
 */

import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';
import find from '..';

const findParentOrSuperItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;
  const extendedAncestorContext = find.extendedAncestorContext(contentItem, contentItemsById);

  if (extendedAncestorContext == null) {
    return null;
  }
  else {
    return contentItemsById[extendedAncestorContext.contextItemId];
  }
};

export default findParentOrSuperItem;
