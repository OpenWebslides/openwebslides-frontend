// @flow
/* eslint-disable flowtype/no-weak-types */

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import * as model from '../../../model';

const {
  contentItemTypes,
  contextTypes,
  ContentItem,
  ContentItemsById,
  VerticalContext,
} = model;

const validateChildOrSubItemsInContextByPropName = (
  context: VerticalContext,
  contentItemsById: ContentItemsById,
  propName: ('childItemIds' | 'subItemIds'),
): void => {
  const parentOrSuperItem: any = contentItemsById[context.contextItemId];
  if (parentOrSuperItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (parentOrSuperItem[propName] == null) throw new InvalidArgumentError(`The passed contextType doesn't match the contentItems type.`);

  const siblingItemIds = parentOrSuperItem[propName];
  let siblingItem: ContentItem;
  let hasEncounteredHeading: boolean = false;

  siblingItemIds.forEach((siblingItemId: Identifier): void => {
    siblingItem = contentItemsById[siblingItemId];
    if (siblingItem == null) throw new CorruptedInternalStateError(`ContentItemsById object contains inconsistencies; this shouldn't happen.`);

    if (siblingItem.type === contentItemTypes.HEADING) {
      hasEncounteredHeading = true;
    }
    else if (hasEncounteredHeading) {
      throw new CorruptedInternalStateError(`HEADING contentItems can only be followed by other HEADINGs.`);
    }
  });
};

const validateChildOrSubItemsInContext = (
  context: VerticalContext,
  contentItemsById: ContentItemsById,
): void => {
  switch (context.contextType) {
    case contextTypes.SUPER:
      validateChildOrSubItemsInContextByPropName(context, contentItemsById, 'subItemIds');
      break;
    case contextTypes.PARENT:
      validateChildOrSubItemsInContextByPropName(context, contentItemsById, 'childItemIds');
      break;
    default:
      throw new InvalidArgumentError(`Invalid contextType.`);
  }
};

export default validateChildOrSubItemsInContext;
