// @flow
// Allow weak types in this file since constantly constantly converting ContentItems into
// DenormalizedContentItems is unintuitive and too complicated.
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import { CorruptedInternalStateError } from 'errors';

import * as m from '../../model';

const denormalizeProp = (
  contentItem: m.ContentItem,
  contentItemsById: m.ContentItemsById,
  denormalizableIdsProp: string,
  denormalizedItemsProp: string,
): m.DenormalizedContentItem => {
  // Create copy of contentItem
  let denormalizedContentItem: any = {
    ...contentItem,
  };

  // If this contentItem is denormalizable
  if (contentItem[denormalizableIdsProp] != null) {
    const descendantItems: Array<m.DenormalizedContentItem> = [];
    let descendantItem: any;
    // Iterate over all denormalizableIds.
    denormalizedContentItem[denormalizableIdsProp].forEach(
      (denormalizableId: string): void => {
        // Get the contentItem object for this id.
        descendantItem = _.get(contentItemsById, denormalizableId, null);
        // Recursively denormalize the descendant item.
        // eslint-disable-next-line no-use-before-define
        descendantItem = denormalize(descendantItem, contentItemsById);
        // Add it to the array of descendant items.
        if (descendantItem != null) {
          descendantItems.push(descendantItem);
        }
        else {
          throw new CorruptedInternalStateError(`Invalid contentItemsById: descendant item could not be found.`);
        }
      },
    );
    // Set the denormalizedItemsProp on the denormalized contentItem.
    denormalizedContentItem[denormalizedItemsProp] = descendantItems;
    // Remove the denormalizableIdsProp from the denormalized contentItem.
    denormalizedContentItem = _.omit(denormalizedContentItem, denormalizableIdsProp);
  }

  return denormalizedContentItem;
};

const denormalize = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
): ?m.DenormalizedContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    let denormalizedContentItem: any = { ...contentItem };

    // Denormalize subItemIds.
    denormalizedContentItem = denormalizeProp(
      (denormalizedContentItem: any),
      contentItemsById,
      'subItemIds',
      'subItems',
    );

    // Denormalize childItemIds.
    denormalizedContentItem = denormalizeProp(
      (denormalizedContentItem: any),
      contentItemsById,
      'childItemIds',
      'childItems',
    );

    return denormalizedContentItem;
  }
};

export default denormalize;
