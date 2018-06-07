// @flow

import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../../model';
import * as dummyData from '../../../../lib/test-resources/dummyContentItemData';

import findParentOrSuperItem from '..';

describe(`findParentOrSuperItem`, (): void => {

  let dummyParagraph4: $Exact<ParagraphContentItem>;
  let dummyParagraph3: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph2: $Exact<ParagraphContentItem>;
  let dummyParagraph1: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;

  beforeEach((): void => {
    dummyParagraph4 = {
      ...dummyData.paragraphContentItem4,
    };
    dummyParagraph3 = {
      ...dummyData.paragraphContentItem3,
    };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph3.id, dummyParagraph4.id],
    };
    dummyParagraph2 = {
      ...dummyData.paragraphContentItem2,
    };
    dummyParagraph1 = {
      ...dummyData.paragraphContentItem,
    };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph1.id]: dummyParagraph1,
      [dummyParagraph2.id]: dummyParagraph2,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph3.id]: dummyParagraph3,
      [dummyParagraph4.id]: dummyParagraph4,
    };
  });

  it(`returns the parent item, when the passed contentItem is a childItem`, (): void => {
    const expectedResult = dummyRoot;
    const actualResult = findParentOrSuperItem(dummyHeading2, dummyContentItemsById);
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the super item, when the passed contentItem is a subItem`, (): void => {
    const expectedResult = dummyHeading2;
    const actualResult = findParentOrSuperItem(dummyParagraph3, dummyContentItemsById);
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when no parent or super item could be found`, (): void => {
    const expectedResult = null;
    const actualResult = findParentOrSuperItem(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const expectedResult = null;
    const actualResult = findParentOrSuperItem(null, dummyContentItemsById);
    expect(actualResult).toBe(expectedResult);
  });

});
