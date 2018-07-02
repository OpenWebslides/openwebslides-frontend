// @flow
// Allow weak types in this file since constantly constantly converting ContentItems into
// DenormalizedContentItems is unintuitive and too complicated.
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import type { Identifier } from 'types/model';

import { subableContentItemTypes, containerContentItemTypes } from '../../model';
import type {
  ContentItem,
  DenormalizedContentItem,
  ContentItemsById,
} from '../../model';

const denormalizeProp = (
  contentItem: ContentItem,
  contentItemsById: ContentItemsById,
  denormalizableTypes: { +[string]: string },
  denormalizableIdsProp: string,
  denormalizedItemsProp: string,
): DenormalizedContentItem => {
  // Create copy of contentItem
  const denormalizedContentItem: any = {
    ...contentItem,
  };

  // If this contentItem is denormalizable
  if (_.includes(denormalizableTypes, contentItem.type)) {
    const descendantItems: Array<DenormalizedContentItem> = [];
    let descendantItem: any;
    // Iterate over all denormalizableIds.
    denormalizedContentItem[denormalizableIdsProp].forEach(
      (denormalizableId: Identifier): void => {
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
  }

  return denormalizedContentItem;
};

const denormalize = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
): ?DenormalizedContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    let denormalizedContentItem: any = { ...contentItem };

    // Denormalize subItemIds.
    denormalizedContentItem = denormalizeProp(
      (denormalizedContentItem: any),
      contentItemsById,
      subableContentItemTypes,
      'subItemIds',
      'subItems',
    );

    // Denormalize childItemIds.
    denormalizedContentItem = denormalizeProp(
      (denormalizedContentItem: any),
      contentItemsById,
      containerContentItemTypes,
      'childItemIds',
      'childItems',
    );

    return denormalizedContentItem;
  }
};

export default denormalize;
