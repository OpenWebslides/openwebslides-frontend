// @flow
/* eslint-disable flowtype/no-weak-types, react/destructuring-assignment */

import _ from 'lodash';

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';
import type { Identifier } from 'types/model';

import * as m from '../../../model';

const removeChildOrSubItemIdFromContextByPropName = (
  context: m.VerticalContext,
  childOrSubItemId: Identifier,
  contentItemsById: m.ContentItemsById,
  propName: ('childItemIds' | 'subItemIds'),
): m.ContentItem => {
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
  context: m.VerticalContext,
  childOrSubItemId: Identifier,
  contentItemsById: m.ContentItemsById,
): m.ContentItem => {
  switch (context.contextType) {
    case m.contextTypes.SUPER:
      return removeChildOrSubItemIdFromContextByPropName(context, childOrSubItemId, contentItemsById, 'subItemIds');
    case m.contextTypes.PARENT:
      return removeChildOrSubItemIdFromContextByPropName(context, childOrSubItemId, contentItemsById, 'childItemIds');
    default:
      throw new InvalidArgumentError(`Invalid contextType.`);
  }
};

export default removeChildOrSubItemIdFromContext;
