// @flow

import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../model';
import * as dummyData from '../../../lib/testResources/dummyContentItemData';

import findParentOrSuperItem from '.';

describe(`findParentOrSuperItem`, (): void => {

  let dummyParagraph23: $Exact<ParagraphContentItem>;
  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;

  beforeEach((): void => {
    dummyParagraph23 = { ...dummyData.paragraphContentItem5 };
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
    };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
      [dummyParagraph23.id]: dummyParagraph23,
    };
  });

  it(`returns the parent item, when the passed contentItem is a childItem`, (): void => {
    const actualResult = findParentOrSuperItem(dummyHeading2, dummyContentItemsById);
    const expectedResult = dummyRoot;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the super item, when the passed contentItem is a subItem`, (): void => {
    const actualResult = findParentOrSuperItem(dummyParagraph21, dummyContentItemsById);
    const expectedResult = dummyHeading2;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when no parent or super item could be found`, (): void => {
    const actualResult = findParentOrSuperItem(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = findParentOrSuperItem(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

});
