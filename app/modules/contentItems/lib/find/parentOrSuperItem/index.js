// @flow
/**
 * Finds the passed contentItem's parentItem if the passed contentItem is a childItem, or its
 * superItem if it is a subItem.
 */

import * as model from '../../../model';
import find from '..';
import type { SingleFindFunction } from '../types';

const { ContentItem, ContentItemsById } = model;

const findParentOrSuperItem: SingleFindFunction = (
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
