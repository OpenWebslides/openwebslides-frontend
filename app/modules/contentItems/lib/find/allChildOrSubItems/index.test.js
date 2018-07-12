// @flow

import _ from 'lodash';

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import * as m from '../../../model';
import * as dummyData from '../../testResources/dummyContentItemData';

import find from '..';

describe(`findAllChildOrSubItems`, (): void => {

  let dummyParagraph524: $Exact<m.ParagraphContentItem>;
  let dummyParagraph523: $Exact<m.ParagraphContentItem>;
  let dummyParagraph522: $Exact<m.ParagraphContentItem>;
  let dummyParagraph521: $Exact<m.ParagraphContentItem>;
  let dummyTestParentAndSuperItem52: any;
  let dummyParagraph51: $Exact<m.ParagraphContentItem>;
  let dummyHeading5: $Exact<m.HeadingContentItem>;
  let dummyParagraph41: $Exact<m.ParagraphContentItem>;
  let dummyHeading4: $Exact<m.HeadingContentItem>;
  let dummyParagraph32: $Exact<m.ParagraphContentItem>;
  let dummyParagraph31: $Exact<m.ParagraphContentItem>;
  let dummyHeading3: $Exact<m.HeadingContentItem>;
  let dummyParagraph2: $Exact<m.ParagraphContentItem>;
  let dummyParagraph1: $Exact<m.ParagraphContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: any;

  beforeEach((): void => {
    dummyParagraph524 = { ...dummyData.paragraphContentItem10 };
    dummyParagraph523 = { ...dummyData.paragraphContentItem9 };
    dummyParagraph522 = { ...dummyData.paragraphContentItem8 };
    dummyParagraph521 = { ...dummyData.paragraphContentItem7 };
    dummyTestParentAndSuperItem52 = {
      id: 'dummyTestParentAndSuperItem52',
      type: 'TEST_PARENT_AND_SUPER_TYPE',
      isEditing: false,
      childItemIds: [dummyParagraph521.id, dummyParagraph522.id],
      subItemIds: [dummyParagraph523.id, dummyParagraph524.id],
    };
    dummyParagraph51 = { ...dummyData.paragraphContentItem6 };
    dummyHeading5 = {
      ...dummyData.headingContentItem3,
      subItemIds: [dummyParagraph51.id, dummyTestParentAndSuperItem52.id],
    };
    dummyParagraph41 = { ...dummyData.paragraphContentItem5 };
    dummyHeading4 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph41.id],
    };
    dummyParagraph32 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph31 = { ...dummyData.paragraphContentItem3 };
    dummyHeading3 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph31.id, dummyParagraph32.id],
    };
    dummyParagraph2 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph1 = { ...dummyData.paragraphContentItem };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id, dummyHeading4.id, dummyHeading5.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyParagraph1.id]: dummyParagraph1,
      [dummyParagraph2.id]: dummyParagraph2,
      [dummyHeading3.id]: dummyHeading3,
      [dummyParagraph31.id]: dummyParagraph31,
      [dummyParagraph32.id]: dummyParagraph32,
      [dummyHeading4.id]: dummyHeading4,
      [dummyParagraph41.id]: dummyParagraph41,
      [dummyHeading5.id]: dummyHeading5,
      [dummyParagraph51.id]: dummyParagraph51,
      [dummyTestParentAndSuperItem52.id]: dummyTestParentAndSuperItem52,
      [dummyParagraph521.id]: dummyParagraph521,
      [dummyParagraph522.id]: dummyParagraph522,
      [dummyParagraph523.id]: dummyParagraph523,
      [dummyParagraph524.id]: dummyParagraph524,
    };
  });

  it(`returns an array containing all subItems, when the passed contentItem is a superItem`, (): void => {
    const actualResult = find.allChildOrSubItems(dummyHeading3, dummyContentItemsById);
    expect(actualResult).toHaveLength(2);
    expect(actualResult[0]).toBe(dummyParagraph31);
    expect(actualResult[1]).toBe(dummyParagraph32);
  });

  it(`returns an array containing all childItems, when the passed contentItem is a parentItem`, (): void => {
    const actualResult = find.allChildOrSubItems(dummyRoot, dummyContentItemsById);
    expect(actualResult).toHaveLength(5);
    expect(actualResult[0]).toBe(dummyParagraph1);
    expect(actualResult[1]).toBe(dummyParagraph2);
    expect(actualResult[2]).toBe(dummyHeading3);
    expect(actualResult[3]).toBe(dummyHeading4);
    expect(actualResult[4]).toBe(dummyHeading5);
  });

  it(`returns an array containg all childItems and subItems with the childItems before the subItems, when the passed contentItem is a superItem as well as a parentItem`, (): void => {
    const actualResult = find.allChildOrSubItems(dummyTestParentAndSuperItem52, dummyContentItemsById);
    expect(actualResult).toHaveLength(4);
    expect(actualResult[0]).toBe(dummyParagraph521);
    expect(actualResult[1]).toBe(dummyParagraph522);
    expect(actualResult[2]).toBe(dummyParagraph523);
    expect(actualResult[3]).toBe(dummyParagraph524);
  });

  it(`returns an empty array, when the passed contentItem is neither a superItem nor a parentItem`, (): void => {
    const actualResult = find.allChildOrSubItems(dummyParagraph41, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`returns an empty array, when the passed contentItem is NULL`, (): void => {
    const actualResult = find.allChildOrSubItems(null, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph31.id);

    expect((): void => {
      find.allChildOrSubItems(dummyHeading3, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
