// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import denormalize from '..';

import { contentItemTypes } from '../../../model';
import type {
  RootContentItem,
  DenormalizedRootContentItem,
  HeadingContentItem,
  DenormalizedHeadingContentItem,
  ParagraphContentItem,
  DenormalizedParagraphContentItem,
  ListContentItem,
  DenormalizedListContentItem,
  ListItemContentItem,
  DenormalizedListItemContentItem,
  ContentItemsById,
} from '../../../model';

describe(`denormalize`, (): void => {

  const dummyHeading2: $Exact<HeadingContentItem> = {
    id: 'ua32xchh7q',
    type: contentItemTypes.HEADING,
    text: 'Phasellus posuere tincidunt enim',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyRoot2: $Exact<RootContentItem> = {
    id: 'w4lg2u0p1h',
    type: contentItemTypes.ROOT,
    childItemIds: [dummyHeading2.id],
  };
  const dummyNestedParagraph3: $Exact<ParagraphContentItem> = {
    id: 'cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus. Integer hendrerit odio volutpat tincidunt consectetur. Cras venenatis, nibh a dignissim consectetur, augue tortor viverra nisi, quis euismod urna ligula ac turpis. Pellentesque eget faucibus urna, id sodales odio. Quisque ipsum ante, fringilla elementum mauris vel, tincidunt rhoncus augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyNestedParagraph2: $Exact<ParagraphContentItem> = {
    id: 'vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit elit et metus tincidunt semper. Sed ac tellus odio. Sed placerat faucibus leo a convallis. Pellentesque eget libero at lacus rutrum pretium.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyListItem2: $Exact<ListItemContentItem> = {
    id: 'rqwnagv4ky',
    type: contentItemTypes.LIST_ITEM,
    text: 'This is a list item.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
  };
  const dummyListItem1: $Exact<ListItemContentItem> = {
    id: 'dnwy65sy7q',
    type: contentItemTypes.LIST_ITEM,
    text: 'This is a list item.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
  };
  const dummyList1: $Exact<ListContentItem> = {
    id: 'g09fzfwsnp',
    type: contentItemTypes.LIST,
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [dummyNestedParagraph2.id, dummyNestedParagraph3.id],
    childItemIds: [dummyListItem1.id, dummyListItem2.id],
    ordered: false,
  };
  const dummyNestedParagraph1: $Exact<ParagraphContentItem> = {
    id: 'uieqlbgnxb',
    type: contentItemTypes.PARAGRAPH,
    text: 'Morbi sed felis quis mi luctus malesuada at eu neque. Integer auctor lorem leo, ut semper massa dignissim et. Nulla dictum ullamcorper mattis. Suspendisse suscipit porttitor gravida. Aliquam porttitor tortor augue, sit amet lacinia ligula sodales sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vitae purus sed odio pulvinar sagittis egestas non est. Aliquam nisi urna, faucibus in tellus in, tristique suscipit justo. Etiam rutrum nisl sit amet venenatis euismod. Nullam dictum imperdiet libero, et ornare est semper eu. Aenean dui ligula, vulputate et nisi eu, bibendum tempus arcu. In ornare sem et nunc volutpat, eu elementum neque vestibulum. Nullam dictum ipsum in viverra blandit. Suspendisse potenti.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    id: 'yp8bumunth',
    type: contentItemTypes.PARAGRAPH,
    text: 'Nullam ultrices rhoncus quam vulputate bibendum. Aliquam vehicula augue quis nibh iaculis semper.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [dummyNestedParagraph1.id],
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    id: 'j0vcu0y7vk',
    type: contentItemTypes.HEADING,
    text: 'Nam malesuada fermentum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [dummyParagraph1.id, dummyList1.id],
  };
  const dummyRoot1: $Exact<RootContentItem> = {
    id: 'qyrgv0bcd6',
    type: contentItemTypes.ROOT,
    childItemIds: [dummyHeading1.id],
  };
  const dummyContentItemsById: ContentItemsById = {
    [dummyRoot1.id]: dummyRoot1,
    [dummyHeading1.id]: dummyHeading1,
    [dummyParagraph1.id]: dummyParagraph1,
    [dummyNestedParagraph1.id]: dummyNestedParagraph1,
    [dummyList1.id]: dummyList1,
    [dummyListItem1.id]: dummyListItem1,
    [dummyListItem2.id]: dummyListItem2,
    [dummyNestedParagraph2.id]: dummyNestedParagraph2,
    [dummyNestedParagraph3.id]: dummyNestedParagraph3,
    [dummyRoot2.id]: dummyRoot2,
    [dummyHeading2.id]: dummyHeading2,
  };

  it(`returns a denormalized subable contentItem, when the passed contentItem is a subable contentItem`, (): void => {
    const denormalizedContentItem = denormalize(dummyParagraph1, dummyContentItemsById);
    const expectedResult: DenormalizedParagraphContentItem = {
      ...dummyParagraph1,
      subItems: [
        ({
          ...dummyNestedParagraph1,
          subItems: [],
        }: DenormalizedParagraphContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a denormalized container contentItem, when the passed contentItem is a container contentItem`, (): void => {
    const denormalizedContentItem = denormalize(dummyRoot2, dummyContentItemsById);
    const expectedResult: DenormalizedRootContentItem = {
      ...dummyRoot2,
      childItems: [
        ({
          ...dummyHeading2,
          subItems: [],
        }: DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a denormalized subable / container contentItem, when the passed contentItem is a subable / container contentItem`, (): void => {
    const denormalizedContentItem = denormalize(dummyList1, dummyContentItemsById);
    const expectedResult: DenormalizedListContentItem = {
      ...dummyList1,
      childItems: [
        ({
          ...dummyListItem1,
        }: DenormalizedListItemContentItem),
        ({
          ...dummyListItem2,
        }: DenormalizedListItemContentItem),
      ],
      subItems: [
        ({
          ...dummyNestedParagraph2,
          subItems: [],
        }: DenormalizedParagraphContentItem),
        ({
          ...dummyNestedParagraph3,
          subItems: [],
        }: DenormalizedParagraphContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns an unchanged contentItem, when the passed contentItem is neither subable nor a container`, (): void => {
    const denormalizedContentItem = denormalize(dummyListItem1, dummyContentItemsById);
    const expectedResult: DenormalizedListItemContentItem = { ...dummyListItem1 };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });


  it(`returns a multilevel denormalized contentItem, when the passed contentItem has multiple levels of descendants`, (): void => {
    const denormalizedContentItem = denormalize(dummyRoot1, dummyContentItemsById);
    const expectedResult: DenormalizedRootContentItem = {
      ...dummyRoot1,
      childItems: [
        ({
          ...dummyHeading1,
          subItems: [
            ({
              ...dummyParagraph1,
              subItems: [
                ({
                  ...dummyNestedParagraph1,
                  subItems: [],
                }: DenormalizedParagraphContentItem),
              ],
            }: DenormalizedParagraphContentItem),
            ({
              ...dummyList1,
              childItems: [
                ({
                  ...dummyListItem1,
                }: DenormalizedListItemContentItem),
                ({
                  ...dummyListItem2,
                }: DenormalizedListItemContentItem),
              ],
              subItems: [
                ({
                  ...dummyNestedParagraph2,
                  subItems: [],
                }: DenormalizedParagraphContentItem),
                ({
                  ...dummyNestedParagraph3,
                  subItems: [],
                }: DenormalizedParagraphContentItem),
              ],
            }: DenormalizedListContentItem),
          ],
        }: DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

});
