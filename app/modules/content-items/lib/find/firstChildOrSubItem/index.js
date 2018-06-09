// @flow
/* eslint-disable flowtype/no-weak-types */
/**
 * Finds the first child- or subItem of the passed ContentItem.
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

const findFirstChildOrSubItem = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?ContentItem => {
  if (contentItem == null) return null;

  let firstChildOrSubItemId: ?Identifier = null;

  // subItems come before childItems in the editor; order is important!
  if (contentItem.subItemIds != null && !_.isEmpty(contentItem.subItemIds)) {
    firstChildOrSubItemId = _.head(((contentItem: any): SubableContentItem).subItemIds);
  }
  if (contentItem.childItemIds != null && !_.isEmpty(contentItem.childItemIds)) {
    firstChildOrSubItemId = _.head(((contentItem: any): ContainerContentItem).childItemIds);
  }

  if (firstChildOrSubItemId == null) {
    return null;
  }
  else {
    const firstChildOrSubItem = contentItemsById[firstChildOrSubItemId];
    if (firstChildOrSubItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    return firstChildOrSubItem;
  }
};

export default findFirstChildOrSubItem;
