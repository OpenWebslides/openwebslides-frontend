// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import find from '..';

describe(`findPreviousEditorItem`, (): void => {

  let dummyHeading3: $Exact<m.HeadingContentItem>;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph142: $Exact<m.ParagraphContentItem>;
  let dummyParagraph141: $Exact<m.ParagraphContentItem>;
  let dummyHeading14: $Exact<m.HeadingContentItem>;
  let dummyParagraph132: $Exact<m.ParagraphContentItem>;
  let dummyParagraph131: $Exact<m.ParagraphContentItem>;
  let dummyHeading13: $Exact<m.HeadingContentItem>;
  let dummyParagraph12: $Exact<m.ParagraphContentItem>;
  let dummyParagraph11: $Exact<m.ParagraphContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: $Exact<m.ContentItemsById>;

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

  it(`returns the superItem, when the passed contentItem is the first in its list of siblings but has a superItem`, (): void => {
    const actualResult = find.previousEditorItem(dummyParagraph131, dummyContentItemsById);
    const expectedResult = dummyHeading13;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the parentItem, when the passed contentItem is the first in its list of siblings but has a parentItem`, (): void => {
    const actualResult = find.previousEditorItem(dummyParagraph11, dummyContentItemsById);
    const expectedResult = dummyHeading1;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the previous sibling, when the passed contentItem is not the first in its list of siblings and the previous sibling has no subItems or childItems`, (): void => {
    const actualResult = find.previousEditorItem(dummyParagraph142, dummyContentItemsById);
    const expectedResult = dummyParagraph141;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the previous sibling's last nested subItem or childItem, when the passed contentItem is not the first in its list of siblings and the previous sibling has subItems or childItems`, (): void => {
    const actualResult = find.previousEditorItem(dummyHeading2, dummyContentItemsById);
    const expectedResult = dummyParagraph142;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, if no previous item can be found`, (): void => {
    const actualResult = find.previousEditorItem(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = find.previousEditorItem(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

});
