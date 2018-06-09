// @flow
/* eslint-disable flowtype/no-weak-types */
/**
 * Finds the last child- or subItem of the passed contentItem.
 */

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import type { Identifier } from 'types/model';

import type {
  ContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsById,
} from '../../../model';

const findLastChildOrSubItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;

  let lastChildOrSubItemId: ?Identifier = null;

  // subItems come before childItems in the editor; order is important!
  if (contentItem.childItemIds != null && !_.isEmpty(contentItem.childItemIds)) {
    lastChildOrSubItemId = _.last(((contentItem: any): ContainerContentItem).childItemIds);
  }
  if (contentItem.subItemIds != null && !_.isEmpty(contentItem.subItemIds)) {
    lastChildOrSubItemId = _.last(((contentItem: any): SubableContentItem).subItemIds);
  }

  if (lastChildOrSubItemId == null) {
    return null;
  }
  else {
    const lastChildOrSubItem = contentItemsById[lastChildOrSubItemId];
    if (lastChildOrSubItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    return lastChildOrSubItem;
  }
};

export default findLastChildOrSubItem;
