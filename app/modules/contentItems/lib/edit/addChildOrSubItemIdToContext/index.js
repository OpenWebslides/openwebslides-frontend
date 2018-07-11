// @flow
/* eslint-disable flowtype/no-weak-types, react/destructuring-assignment */

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';
import insertIntoArray from 'lib/insertIntoArray';

import * as model from '../../../model';

const {
  contextTypes,
  ContentItem,
  ContentItemsById,
  VerticalContext,
} = model;

const addChildOrSubItemIdToContextByPropName = (
  context: VerticalContext,
  childOrSubItemId: Identifier,
  contentItemsById: ContentItemsById,
  propName: ('childItemIds' | 'subItemIds'),
): ContentItem => {
  const parentOrSuperItem: any = contentItemsById[context.contextItemId];
  if (parentOrSuperItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (parentOrSuperItem[propName] == null) throw new InvalidArgumentError(`The passed contextType doesn't match the contentItems type.`);

  const editedContentItem: any = { ...parentOrSuperItem };

  editedContentItem[propName] = insertIntoArray(
    parentOrSuperItem[propName],
    childOrSubItemId,
    (context.indexInSiblingItems || 0),
  );

  return editedContentItem;
};

const addChildOrSubItemIdToContext = (
  context: VerticalContext,
  childOrSubItemId: Identifier,
  contentItemsById: ContentItemsById,
): ContentItem => {
  switch (context.contextType) {
    case contextTypes.SUPER:
      return addChildOrSubItemIdToContextByPropName(context, childOrSubItemId, contentItemsById, 'subItemIds');
    case contextTypes.PARENT:
      return addChildOrSubItemIdToContextByPropName(context, childOrSubItemId, contentItemsById, 'childItemIds');
    default:
      throw new InvalidArgumentError(`Invalid contextType.`);
  }
};

export default addChildOrSubItemIdToContext;
