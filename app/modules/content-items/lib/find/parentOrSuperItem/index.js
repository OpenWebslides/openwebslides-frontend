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
  const context = find.extendedVerticalContext(contentItem, contentItemsById);

  if (context == null) {
    return null;
  }
  else {
    return contentItemsById[context.contextItemId];
  }
};

export default findParentOrSuperItem;
