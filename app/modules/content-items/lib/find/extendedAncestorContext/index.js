// @flow
/* eslint-disable flowtype/no-weak-types */
/**
 * Finds the context of the passed contentItem; this is meant to work around the fact that
 * contentItems don't contain references to their parent- or superItem, only their child- or
 * subItems. It is also helpful to avoid repetition of code in other find functions.
 * If there is no previously known parentOrSuperItem passed, this function loops through all
 * contentItems in order to find the parentOrSuperItem. If the parentOrSuperItem is previously
 * known, make sure to pass it in order to avoid this overhead.
 */

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import type { Identifier } from 'types/model';

import {
  contextTypes,
} from '../../../model';
import type {
  ContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsById,
  ExtendedAncestorContext,
} from '../../../model';

const getContextFromCandidateParentOrSuperItem = (
  contentItem: ContentItem,
  candidateParentOrSuperItem: ContentItem,
): ?ExtendedAncestorContext => {
  let context: ?ExtendedAncestorContext = null;
  let siblingItemIds: Array<Identifier>;

  // If the current candidate is the superItem of the passed contentItem
  if (
    candidateParentOrSuperItem.subItemIds != null &&
    _.includes(
      ((candidateParentOrSuperItem: any): SubableContentItem).subItemIds,
      contentItem.id,
    )
  ) {
    siblingItemIds = ((candidateParentOrSuperItem: any): SubableContentItem).subItemIds;
    context = {
      contextType: contextTypes.SUPER,
      contextItemId: candidateParentOrSuperItem.id,
      siblingItemIds,
      positionInSiblings: _.indexOf(siblingItemIds, contentItem.id),
    };
  }
  // If the current candidate is the parentItem of the passed contentItem
  else if (
    candidateParentOrSuperItem.childItemIds != null &&
    _.includes(
      ((candidateParentOrSuperItem: any): ContainerContentItem).childItemIds,
      contentItem.id,
    )
  ) {
    siblingItemIds = ((candidateParentOrSuperItem: any): ContainerContentItem).childItemIds;
    context = {
      contextType: contextTypes.PARENT,
      contextItemId: candidateParentOrSuperItem.id,
      siblingItemIds,
      positionInSiblings: _.indexOf(siblingItemIds, contentItem.id),
    };
  }

  return context;
};

const findExtendedAncestorContext = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
  // If the parentOrSuperItem is known, it can be passed in order to avoid having to loop through
  // all contentItems.
  parentOrSuperItem: ?ContentItem = null,
): ?ExtendedAncestorContext => {
  if (contentItem == null) return null;

  let context: ?ExtendedAncestorContext = null;

  // If the parentOrSuperItem wasn't previously known
  if (parentOrSuperItem == null) {
    // Loop through all contentItems in contentItemsById
    // until the correct parentOrSuperItem is found.
    const contentItemIds = Object.keys(contentItemsById);
    let i: number = 0;
    while (i < contentItemIds.length && context === null) {
      context = getContextFromCandidateParentOrSuperItem(
        contentItem,
        contentItemsById[contentItemIds[i]],
      );
      i += 1;
    }
  }
  // If the parentOrSuperItem was known
  else {
    // Get the context based on that.
    context = getContextFromCandidateParentOrSuperItem(
      contentItem,
      parentOrSuperItem,
    );
    if (context == null) throw new InvalidArgumentError(`Invalid parentOrSuperItem: the passed parentOrSuperItem did not contain the passed contentItem as either a childItem or a subItem.`);
  }

  return context;
};

export default findExtendedAncestorContext;
