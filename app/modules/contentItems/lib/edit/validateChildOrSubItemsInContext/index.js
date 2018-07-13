// @flow
/* eslint-disable flowtype/no-weak-types, react/destructuring-assignment */

import { CorruptedInternalStateError, InvalidArgumentError, ObjectNotFoundError } from 'errors';
import type { Identifier } from 'types/model';

import * as m from '../../../model';

const validateChildOrSubItemsInContextByPropName = (
  context: m.VerticalContext,
  contentItemsById: m.ContentItemsById,
  propName: ('childItemIds' | 'subItemIds'),
): void => {
  const parentOrSuperItem: any = contentItemsById[context.contextItemId];
  if (parentOrSuperItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (parentOrSuperItem[propName] == null) throw new InvalidArgumentError(`The passed contextType doesn't match the contentItems type.`);

  const siblingItemIds = parentOrSuperItem[propName];
  let siblingItem: m.ContentItem;
  let hasEncounteredHeading: boolean = false;

  siblingItemIds.forEach((siblingItemId: Identifier): void => {
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

const validateChildOrSubItemsInContext = (
  context: m.VerticalContext,
  contentItemsById: m.ContentItemsById,
): void => {
  switch (context.contextType) {
    case m.contextTypes.SUPER:
      validateChildOrSubItemsInContextByPropName(context, contentItemsById, 'subItemIds');
      break;
    case m.contextTypes.PARENT:
      validateChildOrSubItemsInContextByPropName(context, contentItemsById, 'childItemIds');
      break;
    default:
      throw new InvalidArgumentError(`Invalid contextType.`);
  }
};

export default validateChildOrSubItemsInContext;
