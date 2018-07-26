// @flow
/* eslint-disable flowtype/no-weak-types */

import contentItems from 'modules/contentItems';

/**
 * Automatic slide splitting algorithm
 * @param contentItem: ContentItem
 * @returns Array<DenormalizedContentItem>
 */
const recursiveSplit = (
  contentItem: contentItems.model.DenormalizedContentItem,
): Array<contentItems.model.DenormalizedContentItem> => {
  switch (contentItem.type) {
    case contentItems.model.contentItemTypes.ROOT:
      // ROOT content item: split into childItems and recurse
      return contentItem.childItems
        .map((
          c: contentItems.model.DenormalizedContentItem,
        ): Array<contentItems.model.DenormalizedContentItem> => {
          return recursiveSplit(c);
        })
        .reduce((
          arr: Array<contentItems.model.DenormalizedContentItem>,
          c: Array<contentItems.model.DenormalizedContentItem>,
        ): Array<contentItems.model.DenormalizedContentItem> => {
          return arr.concat(c);
        }, []);
    case contentItems.model.contentItemTypes.HEADING: {
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
          subItems: [],
        };
      };

      // Loop over top-level heading's children, splitting and
      // duplicating the top-level heading where necessary.
      return contentItem.subItems.reduce((
        arr: Array<any>,
        item: contentItems.model.DenormalizedContentItem,
      ): Array<contentItems.model.DenormalizedContentItem> => {
        if (
          item.type === contentItems.model.contentItemTypes.HEADING
          && arr[arr.length - 1].subItems.length !== 0
        ) {
          // If child is a heading, create and push a new top-level heading
          // Except if the previous top-level heading has no children (which means that
          // the current subheading is a direct child of the top-level heading)
          arr.push(createHeading());
        }

        // Add the child to the last top-level heading
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
  rootContentItem: contentItems.model.DenormalizedRootContentItem,
): Array<contentItems.model.DenormalizedRootContentItem> => {
  return recursiveSplit(rootContentItem).map((
    item: contentItems.model.DenormalizedContentItem,
    index: number,
  ): contentItems.model.DenormalizedRootContentItem => {
    return {
      id: `${rootContentItem.id}-${index}`,
      type: contentItems.model.contentItemTypes.ROOT,
      isEditing: false,
      childItems: [item],
    };
  });
};

export { recursiveSplit };
export default split;
