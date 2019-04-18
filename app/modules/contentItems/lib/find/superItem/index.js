// @flow

/**
 * Finds the passed contentItem's superItem, if it is a subItem.
 */

import * as m from '../../../model';

import find from '..';

import { type SingleFindFunction } from '../types';

const findSuperItem: SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.ContentItem => {
  if (contentItem == null) return null;
  const context = find.extendedSuperContext(contentItem, contentItemsById);

  if (context == null) {
    return null;
  }
  else {
    return contentItemsById[context.contextItemId];
  }
};

export default findSuperItem;
