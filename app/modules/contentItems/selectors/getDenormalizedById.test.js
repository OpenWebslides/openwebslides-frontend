// @flow

import type {
  RootContentItem,
  DenormalizedRootContentItem,
  HeadingContentItem,
  DenormalizedHeadingContentItem,
  ParagraphContentItem,
  DenormalizedParagraphContentItem,
  ContentItemsById,
} from '../model';
import * as dummyContentItemData from '../lib/testResources/dummyContentItemData';

import selectors from '.';

describe(`getDenormalizedById`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyContentItemData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyContentItemData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyContentItemData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyContentItemData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyContentItemData.paragraphContentItem };
    dummyHeading1 = { ...dummyContentItemData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyContentItemData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };
  });

  it(`returns the correct denormalized contentItem for the given id, when the given id is valid`, (): void => {
    const denormalizedContentItem = selectors.getDenormalizedById(dummyState, { id: dummyRoot.id });
    const expectedResult: DenormalizedRootContentItem = {
      ...dummyRoot,
      childItems: [
        ({
          ...dummyHeading1,
          subItems: [
            ({
              ...dummyParagraph11,
              subItems: [],
            }: DenormalizedParagraphContentItem),
            ({
              ...dummyParagraph12,
              subItems: [],
            }: DenormalizedParagraphContentItem),
          ],
        }: DenormalizedHeadingContentItem),
        ({
          ...dummyHeading2,
          subItems: [
            ({
              ...dummyParagraph21,
              subItems: [],
            }: DenormalizedParagraphContentItem),
            ({
              ...dummyParagraph22,
              subItems: [],
            }: DenormalizedParagraphContentItem),
          ],
        }: DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const denormalizedContentItem = selectors.getDenormalizedById(dummyState, { id: 'DefinitelyNotValidId' });
    expect(denormalizedContentItem).toBeNull();
  });

});
