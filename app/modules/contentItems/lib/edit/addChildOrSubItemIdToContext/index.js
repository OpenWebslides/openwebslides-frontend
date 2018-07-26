// @flow

/* eslint-disable flowtype/no-weak-types, react/destructuring-assignment */

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';
import insertIntoArray from 'lib/insertIntoArray';

import * as m from '../../../model';

const addChildOrSubItemIdToContextByPropName = (
  context: m.VerticalContext,
  childOrSubItemId: string,
  contentItemsById: m.ContentItemsById,
  propName: ('childItemIds' | 'subItemIds'),
): m.ContentItem => {
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
  context: m.VerticalContext,
  childOrSubItemId: string,
  contentItemsById: m.ContentItemsById,
): m.ContentItem => {
  switch (context.contextType) {
    case m.contextTypes.SUPER:
      return addChildOrSubItemIdToContextByPropName(context, childOrSubItemId, contentItemsById, 'subItemIds');
    case m.contextTypes.PARENT:
      return addChildOrSubItemIdToContextByPropName(context, childOrSubItemId, contentItemsById, 'childItemIds');
    default:
      throw new InvalidArgumentError(`Invalid contextType.`);
  }
};

export default addChildOrSubItemIdToContext;
