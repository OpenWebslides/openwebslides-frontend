// @flow

import _ from 'lodash';

import { CorruptedInternalStateError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../model';

import lib from '..';

describe(`denormalize`, (): void => {

  let dummySlideBreak23: m.SlideBreakContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: any;

  beforeEach((): void => {
    dummySlideBreak23 = { ...dummyData.slideBreakContentItem };
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id] };
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
      [dummySlideBreak23.id]: dummySlideBreak23,
    };
  });

  it(`returns a denormalized subable contentItem, when the passed contentItem is a subable contentItem`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummyHeading1, dummyContentItemsById);
    const expectedResult: m.DenormalizedHeadingContentItem = {
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
    };
    expect(denormalizedContentItem).toStrictEqual(expectedResult);
  });

  it(`returns an unchanged contentItem, when the passed contentItem is not subable`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummySlideBreak23, dummyContentItemsById);
    const expectedResult: m.DenormalizedSlideBreakContentItem = { ...dummySlideBreak23 };
    expect(denormalizedContentItem).toStrictEqual(expectedResult);
  });

  it(`returns a multilevel denormalized contentItem, when the passed contentItem has multiple levels of descendants`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummyRoot, dummyContentItemsById);
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
            ({
              ...dummySlideBreak23,
            }: m.DenormalizedSlideBreakContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toStrictEqual(expectedResult);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById structure is corrupted`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph11.id);
    expect((): void => {
      lib.denormalize(dummyRoot, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
