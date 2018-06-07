// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import {
  subableContentItemTypes,
  containerContentItemTypes,
} from '../../../model';
import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';

const findParentOrSuperItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;

  const contentItemIds = Object.keys(contentItemsById);
  // eslint-disable-next-line flowtype/no-weak-types
  let candidateParentOrSuperItem: any;
  let parentOrSuperItem: ?ContentItem = null;
  let i: number = 0;

  while (i < contentItemIds.length && parentOrSuperItem === null) {
    candidateParentOrSuperItem = (contentItemsById[contentItemIds[i]]: any);

    if (_.includes(subableContentItemTypes, candidateParentOrSuperItem.type)) {
      if (_.includes(candidateParentOrSuperItem.subItemIds, contentItem.id)) {
        parentOrSuperItem = candidateParentOrSuperItem;
      }
    }

    if (_.includes(containerContentItemTypes, candidateParentOrSuperItem.type)) {
      if (_.includes(candidateParentOrSuperItem.childItemIds, contentItem.id)) {
        parentOrSuperItem = candidateParentOrSuperItem;
      }
    }

    i += 1;
  }

  return parentOrSuperItem;
};

export default findParentOrSuperItem;
