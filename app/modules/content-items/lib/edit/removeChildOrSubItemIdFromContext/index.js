// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import { contextTypes } from '../../../model';
import type {
  ContentItem,
  ContentItemsById,
  VerticalContext,
} from '../../../model';

const removeChildOrSubItemIdFromContextByPropName = (
  context: VerticalContext,
  childOrSubItemId: Identifier,
  contentItemsById: ContentItemsById,
  propName: ('childItemIds' | 'subItemIds'),
): ContentItem => {
  const parentOrSuperItem: any = contentItemsById[context.contextItemId];
  if (parentOrSuperItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (parentOrSuperItem[propName] == null) throw new InvalidArgumentError(`The passed contextType doesn't match the contentItems type.`);
  if (!_.includes(parentOrSuperItem[propName], childOrSubItemId)) throw new InvalidArgumentError(`The passed contentItem does not contain the passed childOrSubItem.`);

  const editedContentItem = { ...parentOrSuperItem };

  editedContentItem[propName] = _.without(
    parentOrSuperItem[propName],
    childOrSubItemId,
  );

  return editedContentItem;
};

const removeChildOrSubItemIdFromContext = (
  context: VerticalContext,
  childOrSubItemId: Identifier,
  contentItemsById: ContentItemsById,
): ContentItem => {
  switch (context.contextType) {
    case contextTypes.SUPER:
      return removeChildOrSubItemIdFromContextByPropName(context, childOrSubItemId, contentItemsById, 'subItemIds');
    case contextTypes.PARENT:
      return removeChildOrSubItemIdFromContextByPropName(context, childOrSubItemId, contentItemsById, 'childItemIds');
    default:
      throw new InvalidArgumentError(`Invalid contextType.`);
  }
};

export default removeChildOrSubItemIdFromContext;
