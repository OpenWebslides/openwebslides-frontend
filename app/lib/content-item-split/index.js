// @flow

import type {
  DenormalizedContentItem,
  DenormalizedRootContentItem,
  DenormalizedHeadingContentItem,
} from 'modules/content-items';

import { contentItemTypes } from 'modules/content-items';

const recursiveSplit = (
  contentItem: DenormalizedContentItem,
  heading: ?DenormalizedHeadingContentItem,
): Array<DenormalizedContentItem> => {
  switch (contentItem.type) {
    case contentItemTypes.ROOT:
      console.log(`ROOT: splitting recursively into ${contentItem.childItems.length}`);
      // ROOT content item: split into childItems and recurse
      return contentItem.childItems
        .map((c: DenormalizedContentItem): DenormalizedContentItem => {
          return recursiveSplit(c, heading);
        })
        .reduce((arr, c) => arr.concat(c));
    case contentItemTypes.HEADING: {
      console.log(`HEADING: splitting into ${contentItem.subItems.length}`);
      /**
       * Algorithm for splitting subheadings, while duplicating the top-level heading
       *
       * Main Heading
       *    ├─ Paragraph A
       *    ├─ Subheading 1
       *    │     └─ Paragraph B
       *    └─ Subheading 2
       *          └─ Paragraph C
       *
       * To
       *
       * Main Heading
       *    ├─ Paragraph A
       *    └─ Subheading 1
       *          └─ Paragraph B
       * Main Heading
       *    └─ Subheading 2
       *          └─ Paragraph C
       */

      // Return a copy of the top-level heading
      const createHeading = (): DenormalizedHeadingContentItem => {
        return {
          ...contentItem,
          subItems: [],
        };
      };

      const out = contentItem.subItems.reduce((
        arr: Array<DenormalizedContentItem>,
        item: DenormalizedContentItem,
      ): Array<DenormalizedContentItem> => {
        if (item.type === contentItemTypes.HEADING) {
          // If child is a heading, create and push a new top-level heading
          arr.push(createHeading());
        }

        // Add the child to the last top-level heading
        arr[arr.length - 1].subItems.push(item);
        return arr;
      },
      [createHeading()]);

      return out;
    }
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
  return recursiveSplit(rootContentItem, null);
};

export default split;
