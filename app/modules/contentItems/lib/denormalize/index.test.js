// @flow

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import * as m from '../../model';
import * as dummyData from '../testResources/dummyContentItemData';

import denormalize from '.';

describe(`denormalize`, (): void => {

  let dummySlideBreak32: $Exact<m.SlideBreakContentItem>;
  let dummyParagraph314: $Exact<m.ParagraphContentItem>;
  let dummyParagraph313: $Exact<m.ParagraphContentItem>;
  let dummyParagraph312: $Exact<m.ParagraphContentItem>;
  let dummyParagraph311: $Exact<m.ParagraphContentItem>;
  let dummyTestParentAndSuperItem31: any;
  let dummyRoot3: $Exact<m.RootContentItem>;
  let dummyHeading22: $Exact<m.HeadingContentItem>;
  let dummyHeading21: $Exact<m.HeadingContentItem>;
  let dummyRoot2: $Exact<m.RootContentItem>;
  let dummyParagraph122: $Exact<m.ParagraphContentItem>;
  let dummyParagraph121: $Exact<m.ParagraphContentItem>;
  let dummyHeading12: $Exact<m.HeadingContentItem>;
  let dummyParagraph112: $Exact<m.ParagraphContentItem>;
  let dummyParagraph111: $Exact<m.ParagraphContentItem>;
  let dummyHeading11: $Exact<m.HeadingContentItem>;
  let dummyRoot1: $Exact<m.RootContentItem>;
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
    const denormalizedContentItem = denormalize(dummyHeading11, dummyContentItemsById);
    const expectedResult: m.DenormalizedHeadingContentItem = {
      ...dummyHeading11,
      subItems: [
        ({
          ...dummyParagraph111,
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
        ({
          ...dummyParagraph112,
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a denormalized container contentItem, when the passed contentItem is a container contentItem`, (): void => {
    const denormalizedContentItem = denormalize(dummyRoot2, dummyContentItemsById);
    const expectedResult: m.DenormalizedRootContentItem = {
      ...dummyRoot2,
      childItems: [
        ({
          ...dummyHeading21,
          subItems: [],
        }: m.DenormalizedHeadingContentItem),
        ({
          ...dummyHeading22,
          subItems: [],
        }: m.DenormalizedHeadingContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns a denormalized subable / container contentItem, when the passed contentItem is a subable / container contentItem`, (): void => {
    const denormalizedContentItem = denormalize(dummyTestParentAndSuperItem31, dummyContentItemsById);
    const expectedResult = {
      ...dummyTestParentAndSuperItem31,
      childItems: [
        ({
          ...dummyParagraph311,
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
        ({
          ...dummyParagraph312,
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
      ],
      subItems: [
        ({
          ...dummyParagraph313,
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
        ({
          ...dummyParagraph314,
          subItems: [],
        }: m.DenormalizedParagraphContentItem),
      ],
    };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });

  it(`returns an unchanged contentItem, when the passed contentItem is neither subable nor a container`, (): void => {
    const denormalizedContentItem = denormalize(dummySlideBreak32, dummyContentItemsById);
    const expectedResult: m.DenormalizedSlideBreakContentItem = { ...dummySlideBreak32 };
    expect(denormalizedContentItem).toEqual(expectedResult);
  });


  it(`returns a multilevel denormalized contentItem, when the passed contentItem has multiple levels of descendants`, (): void => {
    const denormalizedContentItem = denormalize(dummyRoot1, dummyContentItemsById);
    const expectedResult: m.DenormalizedRootContentItem = {
      ...dummyRoot1,
      childItems: [
        ({
          ...dummyHeading11,
          subItems: [
            ({
              ...dummyParagraph111,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ...dummyParagraph112,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
          ],
        }: m.DenormalizedHeadingContentItem),
        ({
          ...dummyHeading12,
          subItems: [
            ({
              ...dummyParagraph121,
              subItems: [],
            }: m.DenormalizedParagraphContentItem),
            ({
              ...dummyParagraph122,
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
      denormalize(dummyRoot1, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
