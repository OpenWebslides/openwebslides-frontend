// @flow

import _ from 'lodash';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getDenormalizedById`, (): void => {

  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyData.rootContentItem, subItemIds: [dummyHeading1.id, dummyHeading2.id] };
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
      ..._.omit(dummyRoot, 'subItemIds'),
      subItems: [
        ({
          ..._.omit(dummyHeading1, 'subItemIds'),
          subItems: [
            ({
              ..._.omit(dummyParagraph11, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ..._.omit(dummyParagraph12, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
        ({
          ..._.omit(dummyHeading2, 'subItemIds'),
          subItems: [
            ({
              ..._.omit(dummyParagraph21, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ..._.omit(dummyParagraph22, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toStrictEqual(expectedResult);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const denormalizedContentItem = selectors.getDenormalizedById(dummyState, { id: 'DefinitelyNotValidId' });
    expect(denormalizedContentItem).toBeNull();
  });

});
