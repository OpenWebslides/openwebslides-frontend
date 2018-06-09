// @flow

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
} from '../../../../model';
import * as dummyData from '../../../../lib/test-resources/dummyContentItemData';

import findFirstChildOrSubItem from '..';

describe(`findFirstChildOrSubItem`, (): void => {

  let dummyParagraph214: $Exact<ParagraphContentItem>;
  let dummyParagraph213: $Exact<ParagraphContentItem>;
  let dummyParagraph212: $Exact<ParagraphContentItem>;
  let dummyParagraph211: $Exact<ParagraphContentItem>;
  let dummyTestParentAndSuperItem21: any;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: any;

  beforeEach((): void => {
    dummyParagraph214 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph213 = { ...dummyData.paragraphContentItem5 };
    dummyParagraph212 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph211 = { ...dummyData.paragraphContentItem3 };
    dummyTestParentAndSuperItem21 = {
      id: 'abcdefghijklmnopqrst',
      type: 'TEST_PARENT_AND_SUPER_TYPE',
      isEditing: false,
      childItemIds: [dummyParagraph211.id, dummyParagraph212.id],
      subItemIds: [dummyParagraph213.id, dummyParagraph214.id],
    };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyTestParentAndSuperItem21.id],
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
      [dummyTestParentAndSuperItem21.id]: dummyTestParentAndSuperItem21,
      [dummyParagraph211.id]: dummyParagraph211,
      [dummyParagraph212.id]: dummyParagraph212,
      [dummyParagraph213.id]: dummyParagraph213,
      [dummyParagraph214.id]: dummyParagraph214,
    };
  });

  it(`returns the first subItem, if the passed contentItem is a superItem`, (): void => {
    const actualResult = findFirstChildOrSubItem(dummyHeading1, dummyContentItemsById);
    const expectedResult = dummyParagraph11;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the first childItem, if the passed contentitem is a parentItem`, (): void => {
    const actualResult = findFirstChildOrSubItem(dummyRoot, dummyContentItemsById);
    const expectedResult = dummyHeading1;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the first childItem, if the passed contentItem is a parentItem as well as a superItem`, (): void => {
    const actualResult = findFirstChildOrSubItem(dummyTestParentAndSuperItem21, dummyContentItemsById);
    const expectedResult = dummyParagraph211;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = findFirstChildOrSubItem(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is neither a parent nor a superItem`, (): void => {
    const actualResult = findFirstChildOrSubItem(dummyParagraph11, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph11.id);

    expect((): void => {
      findFirstChildOrSubItem(dummyHeading1, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
