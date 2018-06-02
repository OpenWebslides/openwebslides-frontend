// @flow
/* eslint-disable flowtype/no-weak-types */

import type {
  DenormalizedContentItem,
} from 'modules/content-items';

import { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items/model';

/**
 * Automatic slide splitting algorithm
 * @param contentItem: ContentItem
 * @returns Array<DenormalizedContentItem>
 */
const recursiveSplit = (
  contentItem: DenormalizedContentItem,
): Array<DenormalizedContentItem> => {
  switch (contentItem.type) {
    case contentItemTypes.ROOT:
      // ROOT content item: split into childItems and recurse
      return contentItem.childItems
        .map((
          c: DenormalizedContentItem,
        ): Array<DenormalizedContentItem> => {
          return recursiveSplit(c);
        })
        .reduce((
          arr: Array<DenormalizedContentItem>,
          c: Array<DenormalizedContentItem>,
        ): Array<DenormalizedContentItem> => {
          return arr.concat(c);
        }, []);
    case contentItemTypes.HEADING: {
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
       *    └─ Paragraph A
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
      const createHeading = (): any => {
        return {
          ...contentItem,
          subItemIds: [],
          subItems: [],
        };
      };

      // Loop over top-level heading's children, splitting and
      // duplicating the top-level heading where necessary.
      return contentItem.subItems.reduce((
        arr: Array<any>,
        item: DenormalizedContentItem,
      ): Array<DenormalizedContentItem> => {
        if (item.type === contentItemTypes.HEADING && arr[arr.length - 1].subItems.length !== 0) {
          // If child is a heading, create and push a new top-level heading
          // Except if the previous top-level heading has no children (which means that
          // the current subheading is a direct child of the top-level heading)
          arr.push(createHeading());
        }

        // Add the child to the last top-level heading
        arr[arr.length - 1].subItemIds.push(item.id);
        arr[arr.length - 1].subItems.push(item);
        return arr;
      },
      [createHeading()]);
    }
    default:
      return [contentItem];
  }
};

const split = (
  rootContentItem: DenormalizedRootContentItem,
): Array<DenormalizedRootContentItem> => {
  return recursiveSplit(rootContentItem).map(
    (item: DenormalizedContentItem, index: number): DenormalizedRootContentItem => {
      return {
        id: `${rootContentItem.id}-${index}`,
        type: contentItemTypes.ROOT,
        isEditing: false,
        childItems: [item],
      };
    },
  );
};

export { recursiveSplit };
export default split;
