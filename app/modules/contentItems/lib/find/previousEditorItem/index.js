// @flow

/**
 * Finds the contentItem that comes directly before the passed contentItem in editor order.
 */

import _ from 'lodash';

import * as m from '../../../model';

import find from '..';

import { type SingleFindFunction } from '../types';

const findPreviousEditorItem: SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.ContentItem => {
  if (contentItem == null) return null;

  const context = find.extendedVerticalContext(contentItem, contentItemsById);
  if (context == null) return null;

  const { contextItemId, indexInSiblingItems } = context;
  const parentOrSuperItem = contentItemsById[contextItemId];

  // If the contentItem is the first in its list of siblings,
  // the previousEditorItem is its parentOrSuperItem.
  if (indexInSiblingItems == null || indexInSiblingItems === 0) {
    return parentOrSuperItem;
  }
  // If the contentItem is not the first in its list of siblings,
  // the previousEditorItem is the last nested child or subItem of its previous sibling.
  else {
    const prevSibling = find.previousSiblingItem(contentItem, contentItemsById);
    const prevSiblingAllDescendants = find.allDescendantItems(prevSibling, contentItemsById);

    // If the previous sibling doesn't have descendants,
    // the previousEditorItem is the previous sibling itself.
    if (prevSiblingAllDescendants.length === 0) {
      return prevSibling;
    }
    // If it does have descandants, the previousEditorItem is its last descendant.
    else {
      return _.last(prevSiblingAllDescendants);
    }
  }
};

export default findPreviousEditorItem;
