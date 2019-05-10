// @flow

/* eslint-disable flowtype/no-weak-types */

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';
import insertIntoArray from 'lib/insertIntoArray';

import * as m from '../../../model';

const addSubItemIdToContext = (
  context: m.SuperContext,
  subItemId: string,
  contentItemsById: m.ContentItemsById,
): m.ContentItem => {
  const superItem: any = contentItemsById[context.contextItemId];
  if (superItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (superItem.subItemIds == null) throw new InvalidArgumentError(`The passed context was invalid.`);

  const editedContentItem: any = { ...superItem };

  if (context.indexInSiblingItems === -1) {
    editedContentItem.subItemIds = [
      ...superItem.subItemIds,
      subItemId,
    ];
  }
  else {
    editedContentItem.subItemIds = insertIntoArray(
      superItem.subItemIds,
      subItemId,
      (context.indexInSiblingItems || 0),
    );
  }

  return editedContentItem;
};

export default addSubItemIdToContext;
