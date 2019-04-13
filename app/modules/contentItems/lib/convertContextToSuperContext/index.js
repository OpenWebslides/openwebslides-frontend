// @flow

/* eslint-disable flowtype/no-weak-types */

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';

import * as m from '../../model';
import find from '../find';

const convertContextToSuperContext = (
  context: ?m.ContentItemContext,
  contentItemsById: m.ContentItemsById,
): ?m.SuperContext => {
  if (context == null) return null;
  let superContext: ?m.SuperContext;

  if (context.contextType === m.contextTypes.SUPER) {
    superContext = ((context: any): m.SuperContext);
  }
  else if (context.contextType === m.contextTypes.SIBLING) {
    const siblingContext = ((context: any): m.SiblingContext);
    const contextItem = contentItemsById[siblingContext.contextItemId];
    if (contextItem == null) throw new ObjectNotFoundError('contentItems:contentItem', siblingContext.contextItemId);

    superContext = find.extendedSuperContext(contextItem, contentItemsById);
    if (superContext == null) throw new InvalidArgumentError(`Can't refer to a sibling of an item that doesn't have a superItem.`);

    const shiftedIndexInSiblingItems = superContext.indexInSiblingItems
      + 1
      + (siblingContext.indexInSiblingItemsShift || 0);

    if (
      shiftedIndexInSiblingItems < 0
      || shiftedIndexInSiblingItems > superContext.siblingItemIds.length
    ) {
      throw new InvalidArgumentError('Shifted index out of bounds.');
    }
    superContext.indexInSiblingItems = shiftedIndexInSiblingItems;
  }
  else {
    throw new InvalidArgumentError(`Invalid contextType.`);
  }

  return superContext;
};

export default convertContextToSuperContext;
