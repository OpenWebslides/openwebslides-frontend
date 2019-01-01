// @flow

/* eslint-disable flowtype/no-weak-types, react/destructuring-assignment */

import _ from 'lodash';

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';

import * as m from '../../model';
import find from '../find';

const convertContextToVerticalContext = (
  context: ?m.ContentItemContext,
  contentItemsById: m.ContentItemsById,
): ?m.VerticalContext => {
  if (context == null) return null;
  let verticalContext: ?m.VerticalContext;

  if (_.includes(m.verticalContextTypes, context.contextType)) {
    verticalContext = ((context: any): m.VerticalContext);
  }
  else if (_.includes(m.horizontalContextTypes, context.contextType)) {
    const horizontalContext = ((context: any): m.HorizontalContext);
    const contextItem = contentItemsById[horizontalContext.contextItemId];
    if (contextItem == null) throw new ObjectNotFoundError('contentItems:contentItem', horizontalContext.contextItemId);

    verticalContext = find.extendedVerticalContext(contextItem, contentItemsById);
    if (verticalContext == null) throw new InvalidArgumentError(`Can't refer to a sibling of an item that doesn't have a parentOrSuperItem.`);

    const shiftedIndexInSiblingItems = verticalContext.indexInSiblingItems
      + 1
      + (horizontalContext.indexInSiblingItemsShift || 0);

    if (
      shiftedIndexInSiblingItems < 0
      || shiftedIndexInSiblingItems > verticalContext.siblingItemIds.length
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
