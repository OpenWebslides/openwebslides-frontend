// @flow

import * as m from '../../../model';
import * as dummyData from '../../testResources/dummyContentItemData';

import find from '..';

describe(`findClosest`, (): void => {

  let dummyParagraph22: $Exact<m.ParagraphContentItem>;
  let dummyParagraph21: $Exact<m.ParagraphContentItem>;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph122: $Exact<m.ParagraphContentItem>;
  let dummyParagraph121: $Exact<m.ParagraphContentItem>;
  let dummyHeading12: $Exact<m.HeadingContentItem>;
  let dummyParagraph1122: $Exact<m.ParagraphContentItem>;
  let dummyParagraph1121: $Exact<m.ParagraphContentItem>;
  let dummyParagraph112: $Exact<m.ParagraphContentItem>;
  let dummyParagraph111: $Exact<m.ParagraphContentItem>;
  let dummyHeading11: $Exact<m.HeadingContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: m.ContentItemsById;

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

  it(`returns the first recursive singleFindFunction result, when no predicate is passed`, (): void => {
    const actualResult = find.closest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem);
    const expectedResult = dummyParagraph112;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the first recursive singleFindFunction result for which the passed predicate returns TRUE`, (): void => {
    const dummyPredicate = (contentItem: m.ContentItem): boolean => (contentItem.type === m.contentItemTypes.HEADING);
    const actualResult = find.closest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem, dummyPredicate);
    const expectedResult = dummyHeading11;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when there is no recursive singleFindFunction result for which the passed predicate returns TRUE`, (): void => {
    const dummyPredicate = (contentItem: m.ContentItem): boolean => (contentItem.type === m.contentItemTypes.BLOCKQUOTE);
    const actualResult = find.closest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem, dummyPredicate);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = find.closest(null, dummyContentItemsById, find.parentOrSuperItem, jest.fn(() => true));
    expect(actualResult).toBeNull();
  });

  it(`calls the passed precicate function with the correct arguments`, (): void => {
    const dummyPredicate = jest.fn(() => false);
    find.closest(dummyParagraph1121, dummyContentItemsById, find.parentOrSuperItem, dummyPredicate);
    expect(dummyPredicate.mock.calls).toEqual([
      [dummyParagraph112, [dummyParagraph1121.id], dummyContentItemsById],
      [dummyHeading11, [dummyParagraph1121.id, dummyParagraph112.id], dummyContentItemsById],
      [dummyHeading1, [dummyParagraph1121.id, dummyParagraph112.id, dummyHeading11.id], dummyContentItemsById],
      [dummyRoot, [dummyParagraph1121.id, dummyParagraph112.id, dummyHeading11.id, dummyHeading1.id], dummyContentItemsById],
    ]);
  });

});
