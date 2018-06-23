// @flow

import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../../model';
import * as dummyData from '../../../../lib/test-resources/dummyContentItemData';

import findNextEditorItem from '..';

describe(`findNextEditorItem`, (): void => {

  let dummyHeading3: $Exact<HeadingContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph142: $Exact<ParagraphContentItem>;
  let dummyParagraph141: $Exact<ParagraphContentItem>;
  let dummyHeading14: $Exact<HeadingContentItem>;
  let dummyParagraph132: $Exact<ParagraphContentItem>;
  let dummyParagraph131: $Exact<ParagraphContentItem>;
  let dummyHeading13: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;

  beforeEach((): void => {
    dummyHeading3 = { ...dummyData.headingContentItem5 };
    dummyHeading2 = { ...dummyData.headingContentItem4 };
    dummyParagraph142 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph141 = { ...dummyData.paragraphContentItem5 };
    dummyHeading14 = {
      ...dummyData.headingContentItem3,
      subItemIds: [dummyParagraph141.id, dummyParagraph142.id],
    };
    dummyParagraph132 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph131 = { ...dummyData.paragraphContentItem3 };
    dummyHeading13 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph131.id, dummyParagraph132.id],
    };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id, dummyHeading13.id, dummyHeading14.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id, dummyHeading3.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading13.id]: dummyHeading13,
      [dummyParagraph131.id]: dummyParagraph131,
      [dummyParagraph132.id]: dummyParagraph132,
      [dummyHeading14.id]: dummyHeading14,
      [dummyParagraph141.id]: dummyParagraph141,
      [dummyParagraph142.id]: dummyParagraph142,
      [dummyHeading2.id]: dummyHeading2,
      [dummyHeading3.id]: dummyHeading3,
    };
  });

  it(`returns the first childItem, when the passed contentItem is a parentItem`, (): void => {
    const actualResult = findNextEditorItem(dummyRoot, dummyContentItemsById);
    const expectedResult = dummyHeading1;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the first subItem, when the passed contentItem is a superItem`, (): void => {
    const actualResult = findNextEditorItem(dummyHeading1, dummyContentItemsById);
    const expectedResult = dummyParagraph11;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the next sibling, when the passed contentItem has no subItems or childItems and is not the last in its list of siblings`, (): void => {
    const actualResult = findNextEditorItem(dummyParagraph11, dummyContentItemsById);
    const expectedResult = dummyParagraph12;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the parent- or superItem's next sibling, when the passed contentItem has no subItems or childItems and is the last in its list of siblings and its parent- or superItem is not the last in its list of siblings`, (): void => {
    const actualResult = findNextEditorItem(dummyParagraph132, dummyContentItemsById);
    const expectedResult = dummyHeading14;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the next sibling of the first ancestorItem that has one, when the passed contentItem has no subItems or childItems and is the last in its list of siblings and its parent- or superItem is the last in its list of siblings`, (): void => {
    const actualResult = findNextEditorItem(dummyParagraph142, dummyContentItemsById);
    const expectedResult = dummyHeading2;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, if no next item can be found`, (): void => {
    const actualResult = findNextEditorItem(dummyHeading3, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = findNextEditorItem(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

});
