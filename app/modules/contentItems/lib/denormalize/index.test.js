// @flow

import _ from 'lodash';

import { CorruptedInternalStateError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../model';

import lib from '..';

describe(`denormalize`, (): void => {

  let dummySlideBreak32: m.SlideBreakContentItem;
  let dummyParagraph314: m.ParagraphContentItem;
  let dummyParagraph313: m.ParagraphContentItem;
  let dummyParagraph312: m.ParagraphContentItem;
  let dummyParagraph311: m.ParagraphContentItem;
  let dummyTestParentAndSuperItem31: any;
  let dummyRoot3: m.RootContentItem;
  let dummyHeading22: m.HeadingContentItem;
  let dummyHeading21: m.HeadingContentItem;
  let dummyRoot2: m.RootContentItem;
  let dummyParagraph122: m.ParagraphContentItem;
  let dummyParagraph121: m.ParagraphContentItem;
  let dummyHeading12: m.HeadingContentItem;
  let dummyParagraph112: m.ParagraphContentItem;
  let dummyParagraph111: m.ParagraphContentItem;
  let dummyHeading11: m.HeadingContentItem;
  let dummyRoot1: m.RootContentItem;
  let dummyContentItemsById: any;

  beforeEach((): void => {
    dummySlideBreak32 = { ...dummyData.slideBreakContentItem };
    dummyParagraph314 = { ...dummyData.paragraphContentItem8 };
    dummyParagraph313 = { ...dummyData.paragraphContentItem7 };
    dummyParagraph312 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph311 = { ...dummyData.paragraphContentItem5 };
    dummyTestParentAndSuperItem31 = {
      id: 'dummyTestParentAndSuperItem52',
      type: 'TEST_PARENT_AND_SUPER_TYPE',
      isEditing: false,
      childItemIds: [dummyParagraph311.id, dummyParagraph312.id],
      subItemIds: [dummyParagraph313.id, dummyParagraph314.id],
    };
    dummyRoot3 = { ...dummyData.rootContentItem3, childItemIds: [dummyTestParentAndSuperItem31.id, dummySlideBreak32.id] };
    dummyHeading22 = { ...dummyData.headingContentItem4 };
    dummyHeading21 = { ...dummyData.headingContentItem3 };
    dummyRoot2 = { ...dummyData.rootContentItem2, childItemIds: [dummyHeading21.id, dummyHeading22.id] };
    dummyParagraph122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem3 };
    dummyHeading12 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph121.id, dummyParagraph122.id] };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] };
    dummyRoot1 = { ...dummyData.rootContentItem, childItemIds: [dummyHeading11.id, dummyHeading12.id] };
    dummyContentItemsById = {
      [dummyRoot1.id]: dummyRoot1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyHeading12.id]: dummyHeading12,
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyRoot2.id]: dummyRoot2,
      [dummyHeading21.id]: dummyHeading21,
      [dummyHeading22.id]: dummyHeading22,
      [dummyRoot3.id]: dummyRoot3,
      [dummyTestParentAndSuperItem31.id]: dummyTestParentAndSuperItem31,
      [dummyParagraph311.id]: dummyParagraph311,
      [dummyParagraph312.id]: dummyParagraph312,
      [dummyParagraph313.id]: dummyParagraph313,
      [dummyParagraph314.id]: dummyParagraph314,
      [dummySlideBreak32.id]: dummySlideBreak32,
    };
  });

  it(`returns a denormalized subable contentItem, when the passed contentItem is a subable contentItem`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummyHeading11, dummyContentItemsById);
    const expectedResult: m.DenormalizedHeadingContentItem = {
      ..._.omit(dummyHeading11, 'subItemIds'),
      subItems: [
        ({
          ..._.omit(dummyParagraph111, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
        ({
          ..._.omit(dummyParagraph112, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a denormalized container contentItem, when the passed contentItem is a container contentItem`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummyRoot2, dummyContentItemsById);
    const expectedResult: m.DenormalizedRootContentItem = {
      ..._.omit(dummyRoot2, 'childItemIds'),
      childItems: [
        ({
          ..._.omit(dummyHeading21, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedHeadingContentItem),
        ({
          ..._.omit(dummyHeading22, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a denormalized subable / container contentItem, when the passed contentItem is a subable / container contentItem`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummyTestParentAndSuperItem31, dummyContentItemsById);
    const expectedResult = {
      ..._.omit(_.omit(dummyTestParentAndSuperItem31, 'subItemIds'), 'childItemIds'),
      childItems: [
        ({
          ..._.omit(dummyParagraph311, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
        ({
          ..._.omit(dummyParagraph312, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
      ],
      subItems: [
        ({
          ..._.omit(dummyParagraph313, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
        ({
          ..._.omit(dummyParagraph314, 'subItemIds'),
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns an unchanged contentItem, when the passed contentItem is neither subable nor a container`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummySlideBreak32, dummyContentItemsById);
    const expectedResult: m.DenormalizedSlideBreakContentItem = { ...dummySlideBreak32 };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a multilevel denormalized contentItem, when the passed contentItem has multiple levels of descendants`, (): void => {
    const denormalizedContentItem = lib.denormalize(dummyRoot1, dummyContentItemsById);
    const expectedResult: m.DenormalizedRootContentItem = {
      ..._.omit(dummyRoot1, 'childItemIds'),
      childItems: [
        ({
          ..._.omit(dummyHeading11, 'subItemIds'),
          subItems: [
            ({
              ..._.omit(dummyParagraph111, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ..._.omit(dummyParagraph112, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
        ({
          ..._.omit(dummyHeading12, 'subItemIds'),
          subItems: [
            ({
              ..._.omit(dummyParagraph121, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ..._.omit(dummyParagraph122, 'subItemIds'),
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById structure is corrupted`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph111.id);
    expect((): void => {
      lib.denormalize(dummyRoot1, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
