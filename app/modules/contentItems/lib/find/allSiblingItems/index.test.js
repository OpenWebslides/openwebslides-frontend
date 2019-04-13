// @flow

import _ from 'lodash';

import { CorruptedInternalStateError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`findAllSiblingItems`, (): void => {

  let dummyParagraph23: m.ParagraphContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
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
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      subItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
      [dummyParagraph23.id]: dummyParagraph23,
    };
  });

  it(`returns an array containing all subItems of the passed contentItem's superItem, when the passed contentItem is a subItem`, (): void => {
    const actualResult = lib.find.allSiblingItems(dummyParagraph22, dummyContentItemsById);
    expect(actualResult).toHaveLength(3);
    expect(actualResult[0]).toBe(dummyParagraph21);
    expect(actualResult[1]).toBe(dummyParagraph22);
    expect(actualResult[2]).toBe(dummyParagraph23);
  });

  it(`returns an array containing only the passed contentItem itself, when the passed contentItem doesn't have siblings`, (): void => {
    const actualResult = lib.find.allSiblingItems(dummyParagraph11, dummyContentItemsById);
    expect(actualResult).toHaveLength(1);
    expect(actualResult[0]).toBe(dummyParagraph11);
  });

  it(`returns an empty array, when the passed contentItem is NULL`, (): void => {
    const actualResult = lib.find.allSiblingItems(null, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`returns an empty array, when the passed contentItem is not a subItem (i.e. is a ROOT)`, (): void => {
    const actualResult = lib.find.allSiblingItems(dummyRoot, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph21.id);

    expect((): void => {
      lib.find.allSiblingItems(dummyParagraph22, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
