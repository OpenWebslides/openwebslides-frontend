// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';

import {
  contextTypes,
} from '../../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ExtendedAncestorContext,
} from '../../../../model';
import * as dummyData from '../../../../lib/test-resources/dummyContentItemData';

import findExtendedAncestorContext from '..';

describe(`findExtendedAncestorContext`, (): void => {

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

  it(`returns the correct context, when the passed contentItem is a subItem`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyParagraph11, dummyContentItemsById);
    const expectedResult: $Exact<ExtendedAncestorContext> = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      siblingItemIds: [dummyParagraph11.id, dummyParagraph12.id],
      positionInSiblings: 0,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct context, when the passed contentItem is a childItem`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyHeading2, dummyContentItemsById);
    const expectedResult: $Exact<ExtendedAncestorContext> = {
      contextType: contextTypes.PARENT,
      contextItemId: dummyRoot.id,
      siblingItemIds: [dummyHeading1.id, dummyHeading2.id],
      positionInSiblings: 1,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct context, when the passed contentItem is the first in its list of siblings`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyParagraph21, dummyContentItemsById);
    const expectedResult: $Exact<ExtendedAncestorContext> = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading2.id,
      siblingItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
      positionInSiblings: 0,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct context, when the passed contentItem is the last in its list of siblings`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyParagraph23, dummyContentItemsById);
    const expectedResult: $Exact<ExtendedAncestorContext> = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading2.id,
      siblingItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
      positionInSiblings: 2,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct context, when the passed contentItem is neither the first nor the last in its list of siblings`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyParagraph22, dummyContentItemsById);
    const expectedResult: $Exact<ExtendedAncestorContext> = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading2.id,
      siblingItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummyParagraph23.id],
      positionInSiblings: 1,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct context, when the parentOrSuperItem is passed as a argument`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyParagraph11, dummyContentItemsById, dummyHeading1);
    const expectedResult: $Exact<ExtendedAncestorContext> = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      siblingItemIds: [dummyParagraph11.id, dummyParagraph12.id],
      positionInSiblings: 0,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`throws an InvalidArgumentError, when the passed parentOrSuperItem doesn't contain the passed contentItem as a subItem or childItem`, (): void => {
    expect((): void => {
      findExtendedAncestorContext(dummyParagraph11, dummyContentItemsById, dummyHeading2);
    }).toThrow(InvalidArgumentError);
  });

  it(`returns NULL, when the passed contentItem is neither a child- nor a subItem (i.e. is a ROOT)`, (): void => {
    const actualResult = findExtendedAncestorContext(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = findExtendedAncestorContext(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

});
