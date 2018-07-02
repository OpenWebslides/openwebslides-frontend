// @flow

import { contentItemTypes } from '../../../../model';
import type {
  ContentItem,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../../model';
import * as dummyData from '../../../../lib/test-resources/dummyContentItemData';

import find from '../..';
import findFurthest from '..';

describe(`findFurthest`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph122: $Exact<ParagraphContentItem>;
  let dummyParagraph121: $Exact<ParagraphContentItem>;
  let dummyHeading12: $Exact<HeadingContentItem>;
  let dummyParagraph1122: $Exact<ParagraphContentItem>;
  let dummyParagraph1121: $Exact<ParagraphContentItem>;
  let dummyParagraph112: $Exact<ParagraphContentItem>;
  let dummyParagraph111: $Exact<ParagraphContentItem>;
  let dummyHeading11: $Exact<HeadingContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem8 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem7 };
    dummyHeading2 = {
      ...dummyData.headingContentItem4,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph122 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem5 };
    dummyHeading12 = {
      ...dummyData.headingContentItem3,
      subItemIds: [dummyParagraph121.id, dummyParagraph122.id],
    };
    dummyParagraph1122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph1121 = { ...dummyData.paragraphContentItem3 };
    dummyParagraph112 = {
      ...dummyData.paragraphContentItem2,
      subItemIds: [dummyParagraph1121.id, dummyParagraph1122.id],
    };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph111.id, dummyParagraph112.id],
    };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyHeading11.id, dummyHeading12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyParagraph1121.id]: dummyParagraph1121,
      [dummyParagraph1122.id]: dummyParagraph1122,
      [dummyHeading12.id]: dummyHeading12,
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
  });

  it(`returns the last recursive simpleFindFunction result, when no predicate is passed`, (): void => {
    const actualResult = findFurthest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem);
    const expectedResult = dummyRoot;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the last recursive simpleFindFunction result for which the passed predicate returns TRUE`, (): void => {
    const dummyPredicate = (contentItem: ContentItem): boolean => (contentItem.type === contentItemTypes.HEADING);
    const actualResult = findFurthest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem, dummyPredicate);
    const expectedResult = dummyHeading1;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when there is no recursive simpleFindFunction result for which the passed predicate returns TRUE`, (): void => {
    const dummyPredicate = (contentItem: ContentItem): boolean => (contentItem.type === contentItemTypes.BLOCKQUOTE);
    const actualResult = findFurthest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem, dummyPredicate);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = findFurthest(null, dummyContentItemsById, find.parentOrSuperItem, jest.fn(() => true));
    expect(actualResult).toBeNull();
  });

  it(`calls the passed precicate function with the correct arguments`, (): void => {
    const dummyPredicate = jest.fn(() => false);
    findFurthest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem, dummyPredicate);
    expect(dummyPredicate.mock.calls).toEqual([
      [dummyParagraph112, [dummyParagraph1121.id], dummyContentItemsById],
      [dummyHeading11, [dummyParagraph1121.id, dummyParagraph112.id], dummyContentItemsById],
      [dummyHeading1, [dummyParagraph1121.id, dummyParagraph112.id, dummyHeading11.id], dummyContentItemsById],
      [dummyRoot, [dummyParagraph1121.id, dummyParagraph112.id, dummyHeading11.id, dummyHeading1.id], dummyContentItemsById],
    ]);
  });

});
