// @flow

import _ from 'lodash';
import type { Identifier } from 'types/model';

import type {
  ContentItem,
  ContentItemsById,
} from '../../model';

const getDescendants = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): Array<ContentItem> => {
  // Create list of contentItems
  let contentItems: Array<ContentItem> = [contentItem];

  if (contentItem.childItemIds) {
    contentItem.childItemIds.forEach((childId: Identifier): void => {
      const childItem = contentItemsById[childId];
      contentItems = contentItems.concat(getDescendants(childItem, contentItemsById));
    });
  }

  if (contentItem.subItemIds) {
    contentItem.subItemIds.forEach((childId: Identifier): void => {
      const childItem = contentItemsById[childId];
      contentItems = contentItems.concat(getDescendants(childItem, contentItemsById));
    });
  }

  return contentItems;
};

const normalize = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    return getDescendants(contentItem, contentItemsById);
  }
};

export default normalize;
