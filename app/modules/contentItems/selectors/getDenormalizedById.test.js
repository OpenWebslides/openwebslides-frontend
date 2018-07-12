// @flow

import * as m from '../model';
import { dummyContentItemData as dummyData } from '../lib/testResources';

import selectors from '.';

describe(`getDenormalizedById`, (): void => {

  let dummyParagraph22: $Exact<m.ParagraphContentItem>;
  let dummyParagraph21: $Exact<m.ParagraphContentItem>;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph12: $Exact<m.ParagraphContentItem>;
  let dummyParagraph11: $Exact<m.ParagraphContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: $Exact<m.ContentItemsById>;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
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
    const expectedResult: m.DenormalizedRootContentItem = {
      ...dummyRoot,
      childItems: [
        ({
          ...dummyHeading1,
          subItems: [
            ({
              ...dummyParagraph11,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ...dummyParagraph12,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
        ({
          ...dummyHeading2,
          subItems: [
            ({
              ...dummyParagraph21,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ...dummyParagraph22,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const denormalizedContentItem = selectors.getDenormalizedById(dummyState, { id: 'DefinitelyNotValidId' });
    expect(denormalizedContentItem).toBeNull();
  });

});
