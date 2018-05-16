// @flow

import contentItems from 'modules/content-items';

const {
  DenormalizedRootContentItem,
  DenormalizedContentItem,
} = contentItems.model;

/**
 * split - Splits DenormalizedRootContentItem in a list of DenormalizedContentItem
 * Also known as automatic slide splitting algorithm
 */
const split = (rootContentItem: DenormalizedRootContentItem): Array<DenormalizedContentItem> => {
  return rootContentItem.childItems;
};

export default split;
