// @flow

/* eslint-disable flowtype/no-weak-types */
/**
 * Finds the context of the passed contentItem; this is meant to work around the fact that
 * contentItems don't contain references to their superItem, only their subItems. It is also helpful
 * to avoid repetition of code in other find functions. If there is no previously known superItem
 * passed, this function loops through all contentItems in order to find the superItem. If the
 * superItem is previously known, make sure to pass it in order to avoid this overhead.
 */

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';

import * as m from '../../../model';

const getContextFromCandidateSuperItem = (
  contentItem: m.ContentItem,
  candidateSuperItem: m.ContentItem,
): ?m.ExtendedSuperContext => {
  // If the current candidate is the superItem of the passed contentItem
  if (
    candidateSuperItem.subItemIds != null
    && _.includes(((candidateSuperItem: any): m.SubableContentItem).subItemIds, contentItem.id)
  ) {
    const siblingItemIds = ((candidateSuperItem: any): m.SubableContentItem).subItemIds;
    return {
      contextType: m.contextTypes.SUPER,
      contextItemId: candidateSuperItem.id,
      siblingItemIds,
      // $FlowFixMe see https://github.com/flow-typed/flow-typed/issues/1099
      indexInSiblingItems: _.indexOf(siblingItemIds, contentItem.id),
    };
  }
  // If it is not the correct superItem, no context can be created from it.
  else {
    return null;
  }
};

const findExtendedSuperContext = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
  // If the superItem is known, it can be passed,
  // in order to avoid having to loop through all contentItems.
  superItem: ?m.ContentItem = null,
): ?m.ExtendedSuperContext => {
  if (contentItem == null) return null;
  let context: ?m.ExtendedSuperContext = null;

  // If the superItem wasn't previously known
  if (superItem == null) {
    // Loop through all contentItems in contentItemsById until the correct superItem is found.
    const contentItemIds = Object.keys(contentItemsById);
    let i: number = 0;
    while (i < contentItemIds.length && context === null) {
      context = getContextFromCandidateSuperItem(
        contentItem,
        contentItemsById[contentItemIds[i]],
      );
      i += 1;
    }
  }
  // If the superItem was known
  else {
    // Get the context based on that.
    context = getContextFromCandidateSuperItem(
      contentItem,
      superItem,
    );
    if (context == null) throw new InvalidArgumentError(`Invalid superItem: the passed superItem did not contain the passed contentItem as a subItem.`);
  }

  return context;
};

export default findExtendedSuperContext;
