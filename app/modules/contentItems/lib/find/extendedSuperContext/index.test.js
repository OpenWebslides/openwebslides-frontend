// @flow

import { InvalidArgumentError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`findExtendedSuperContext`, (): void => {

  let dummyParagraph23: m.ParagraphContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;

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
      subItemIds: [dummyHeading1.id, dummyHeading2.id],
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

  it(`returns the correct context, when the passed contentItem is the first in its list of siblings`, (): void => {
    const actualResult = lib.find.extendedSuperContext(dummyParagraph21, dummyContentItemsById);
    const expectedResult: m.ExtendedSuperContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading2.id,
      siblingItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
      indexInSiblingItems: 0,
    };
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it(`returns the correct context, when the passed contentItem is the last in its list of siblings`, (): void => {
    const actualResult = lib.find.extendedSuperContext(dummyParagraph23, dummyContentItemsById);
    const expectedResult: m.ExtendedSuperContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading2.id,
      siblingItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
      indexInSiblingItems: 2,
    };
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it(`returns the correct context, when the passed contentItem is neither the first nor the last in its list of siblings`, (): void => {
    const actualResult = lib.find.extendedSuperContext(dummyParagraph22, dummyContentItemsById);
    const expectedResult: m.ExtendedSuperContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading2.id,
      siblingItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
      indexInSiblingItems: 1,
    };
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it(`returns the correct context, when the superItem is passed as a argument`, (): void => {
    const actualResult = lib.find.extendedSuperContext(dummyParagraph11, dummyContentItemsById, dummyHeading1);
    const expectedResult: m.ExtendedSuperContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      siblingItemIds: [dummyParagraph11.id, dummyParagraph12.id],
      indexInSiblingItems: 0,
    };
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it(`throws an InvalidArgumentError, when the passed superItem doesn't contain the passed contentItem as a subItem`, (): void => {
    expect((): void => {
      lib.find.extendedSuperContext(dummyParagraph11, dummyContentItemsById, dummyHeading2);
    }).toThrow(InvalidArgumentError);
  });

  it(`returns NULL, when the passed contentItem is not a subItem (i.e. is a ROOT)`, (): void => {
    const actualResult = lib.find.extendedSuperContext(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = lib.find.extendedSuperContext(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

});
