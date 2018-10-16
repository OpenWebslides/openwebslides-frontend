// @flow

/* eslint-disable flowtype/no-weak-types */

import contentItems from 'modules/contentItems';

/**
 * Automatic slide splitting algorithm
 * @param contentItem: ContentItem
 * @returns $ReadOnlyArray<DenormalizedContentItem>
 */
const recursiveSplit = (
  contentItem: contentItems.model.DenormalizedContentItem,
): $ReadOnlyArray<contentItems.model.DenormalizedContentItem> => {
  switch (contentItem.type) {
    case contentItems.model.contentItemTypes.ROOT:
      // ROOT content item: split into childItems and recurse
      return contentItem.childItems
        .map((
          c: contentItems.model.DenormalizedContentItem,
        ): $ReadOnlyArray<contentItems.model.DenormalizedContentItem> => {
          return recursiveSplit(c);
        })
        .reduce((
          arr: $ReadOnlyArray<contentItems.model.DenormalizedContentItem>,
          c: $ReadOnlyArray<contentItems.model.DenormalizedContentItem>,
        ): $ReadOnlyArray<contentItems.model.DenormalizedContentItem> => {
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
        arr: $ReadOnlyArray<any>,
        item: contentItems.model.DenormalizedContentItem,
      ): $ReadOnlyArray<contentItems.model.DenormalizedContentItem> => {
        let newArr: $ReadOnlyArray<any> = arr;
        if (
          item.type === contentItems.model.contentItemTypes.HEADING
          && newArr[newArr.length - 1].subItems.length !== 0
        ) {
          // If child is a heading, create and push a new top-level heading
          // Except if the previous top-level heading has no children (which means that
          // the current subheading is a direct child of the top-level heading)
          newArr = newArr.concat([createHeading()]);
        }

        // Add the child to the last top-level heading
        newArr[newArr.length - 1].subItems = newArr[newArr.length - 1].subItems.concat([item]);
        return newArr;
      },
      [createHeading()]);
    }
    default:
      return [contentItem];
  }
};

const split = (
  rootContentItem: contentItems.model.DenormalizedRootContentItem,
): $ReadOnlyArray<contentItems.model.DenormalizedRootContentItem> => {
  return recursiveSplit(rootContentItem).map((
    item: contentItems.model.DenormalizedContentItem,
    index: number,
  ): contentItems.model.DenormalizedRootContentItem => {
    return {
      id: `${rootContentItem.id}-${index}`,
      type: contentItems.model.contentItemTypes.ROOT,
      isDirty: rootContentItem.isDirty,
      isEditing: false,
      childItems: [item],
    };
  });
};

export { recursiveSplit };
export default split;
