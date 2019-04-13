// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';

import * as m from '../../../model';

const removeSubItemIdFromContext = (
  context: m.SuperContext,
  subItemId: string,
  contentItemsById: m.ContentItemsById,
): m.ContentItem => {
  const superItem: any = contentItemsById[context.contextItemId];
  if (superItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
  if (superItem.subItemIds == null || !_.includes(superItem.subItemIds, subItemId)) throw new InvalidArgumentError(`The passed contentItem does not contain the passed subItem.`);

  const editedContentItem = { ...superItem };

  editedContentItem.subItemIds = _.without(
    superItem.subItemIds,
    subItemId,
  );

  return editedContentItem;
};

export default removeSubItemIdFromContext;
