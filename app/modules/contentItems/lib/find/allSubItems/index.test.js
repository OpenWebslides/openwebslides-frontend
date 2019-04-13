// @flow

import _ from 'lodash';

import { CorruptedInternalStateError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`findAllSubItems`, (): void => {

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

  it(`returns an array containing all subItems, when the passed contentItem is a superItem`, (): void => {
    const actualResult = lib.find.allSubItems(dummyHeading2, dummyContentItemsById);
    expect(actualResult).toHaveLength(3);
    expect(actualResult[0]).toBe(dummyParagraph21);
    expect(actualResult[1]).toBe(dummyParagraph22);
    expect(actualResult[2]).toBe(dummyParagraph23);
  });

  it(`returns an empty array, when the passed contentItem is not a superItem`, (): void => {
    const actualResult = lib.find.allSubItems(dummyParagraph21, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`returns an empty array, when the passed contentItem is NULL`, (): void => {
    const actualResult = lib.find.allSubItems(null, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph21.id);

    expect((): void => {
      lib.find.allSubItems(dummyHeading2, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
