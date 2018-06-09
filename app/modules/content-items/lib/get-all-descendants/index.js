// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import type { Identifier } from 'types/model';

import type {
  ContentItem,
  ContentItemsById,
  ContainerContentItem,
  SubableContentItem,
} from '../../model';


import {
  subableContentItemTypes,
  containerContentItemTypes,
} from '../../model';

const getDescendants = (
  contentItem: ContentItem,
  contentItemsById: ContentItemsById,
): Array<ContentItem> => {
  // Create list of contentItems
  let contentItems: Array<ContentItem> = [contentItem];

  if (_.includes(containerContentItemTypes, contentItem.type)) {
    // Iterate over children
    ((contentItem: any): ContainerContentItem).childItemIds.forEach((childId: Identifier): void => {
      const childItem = contentItemsById[childId];
      contentItems = contentItems.concat(getDescendants(childItem, contentItemsById));
    });
  }

  if (_.includes(subableContentItemTypes, contentItem.type)) {
    // Iterate over subitems
    ((contentItem: any): SubableContentItem).subItemIds.forEach((childId: Identifier): void => {
      const childItem = contentItemsById[childId];
      contentItems = contentItems.concat(getDescendants(childItem, contentItemsById));
    });
  }

  return contentItems;
};

const getAllDescendants = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): Array<ContentItem> => {
  if (contentItem == null) {
    return [];
  }
  else {
    return getDescendants(contentItem, contentItemsById);
  }
};

export default getAllDescendants;
