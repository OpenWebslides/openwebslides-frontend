// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import {
  verticalContextTypes,
  horizontalContextTypes,
} from '../../model';
import type {
  ContentItemsById,
  Context,
  VerticalContext,
  HorizontalContext,
} from '../../model';
import find from '../../lib/find';

const convertContextToVerticalContext = (
  context: ?Context,
  contentItemsById: ContentItemsById,
): ?VerticalContext => {
  if (context == null) return null;
  let verticalContext: ?VerticalContext;

  if (_.includes(verticalContextTypes, context.contextType)) {
    verticalContext = ((context: any): VerticalContext);
  }
  else if (_.includes(horizontalContextTypes, context.contextType)) {
    const horizontalContext = ((context: any): HorizontalContext);
    const contextItem = contentItemsById[horizontalContext.contextItemId];
    if (contextItem == null) throw new ObjectNotFoundError('contentItems:contentItem', horizontalContext.contextItemId);

    verticalContext = find.extendedVerticalContext(contextItem, contentItemsById);
    if (verticalContext == null) throw new InvalidArgumentError(`Can't refer to a sibling of an item that doesn't have a parentOrSuperItem.`);

    const shiftedIndexInSiblingItems = verticalContext.indexInSiblingItems
      + 1
      + (horizontalContext.indexInSiblingItemsShift || 0);

    if (
      shiftedIndexInSiblingItems < 0 ||
      shiftedIndexInSiblingItems > verticalContext.siblingItemIds.length
    ) {
      throw new InvalidArgumentError('Shifted index out of bounds.');
    }
    verticalContext.indexInSiblingItems = shiftedIndexInSiblingItems;
  }
  else {
    throw new InvalidArgumentError(`Invalid contextType.`);
  }

  return verticalContext;
};

export default convertContextToVerticalContext;
