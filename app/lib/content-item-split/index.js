// @flow

import type {
  DenormalizedContentItem,
  DenormalizedRootContentItem,
} from 'modules/content-items';

import { contentItemTypes } from 'modules/content-items';

const recursiveSplit = (
  contentItem: DenormalizedContentItem,
): Array<DenormalizedContentItem> => {
  switch (contentItem.type) {
    case contentItemTypes.ROOT:
      console.log(`ROOT: splitting recursively into ${contentItem.childItems.length}`);
      // ROOT content item: split into childItems and recurse
      return contentItem.childItems
        .map((c: DenormalizedContentItem): DenormalizedContentItem => {
          return recursiveSplit(c);
        })
        .reduce((arr, c) => arr.concat(c));
    case contentItemTypes.HEADING:
      console.log(`HEADING: adding denormalized content item`);
      // Add HEADING content item and denormalize
      return [contentItem];
    default:
      console.log(`UNKNOWN: not splitting any further`);
      return [contentItem];
  }
};

/**
 * split - Splits DenormalizedRootContentItem in a list of DenormalizedContentItem
 * Also known as automatic slide splitting algorithm
 */
const split = (rootContentItem: DenormalizedRootContentItem): Array<DenormalizedContentItem> => {
  return recursiveSplit(rootContentItem);
};

export default split;
