// @flow

/* eslint-disable flowtype/no-weak-types */

import { CorruptedInternalStateError, InvalidArgumentError, ObjectNotFoundError } from 'errors';

import * as m from '../../../model';

const validateSubItemsInContext = (
  context: m.SuperContext,
  contentItemsById: m.ContentItemsById,
): void => {
  const superItem: any = contentItemsById[context.contextItemId];
  if (superItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (superItem.subItemIds == null) throw new InvalidArgumentError(`The passed context was invalid.`);

  const siblingItemIds = superItem.subItemIds;
  let siblingItem: m.ContentItem;
  let hasEncounteredHeading: boolean = false;

  siblingItemIds.forEach((siblingItemId: string): void => {
    siblingItem = contentItemsById[siblingItemId];
    if (siblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    if (siblingItem.type === m.contentItemTypes.HEADING) {
      hasEncounteredHeading = true;
    }
    else if (hasEncounteredHeading) {
      throw new CorruptedInternalStateError(`HEADING contentItems can only be followed by other HEADINGs.`);
    }
  });
};

export default validateSubItemsInContext;
