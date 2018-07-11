// @flow

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import * as model from '../../../model';
import * as dummyData from '../../testResources/dummyContentItemData';

import find from '..';

const {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} = model;

describe(`findPreviousSiblingItem`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
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
    };
  });

  it(`returns the previous siblingItem, when the passed contentItem is a subItem and not the first in its list of siblings`, (): void => {
    const actualResult = find.previousSiblingItem(dummyParagraph12, dummyContentItemsById);
    const expectedResult = dummyParagraph11;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the previous siblingItem, when the passed contentItem is a childItem and not the first in its list of siblings`, (): void => {
    const actualResult = find.previousSiblingItem(dummyHeading2, dummyContentItemsById);
    const expectedResult = dummyHeading1;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when the passed contentItem is the first in its list of siblings`, (): void => {
    const actualResult = find.previousSiblingItem(dummyParagraph11, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is neither a child- nor a subItem (i.e. is a ROOT)`, (): void => {
    const actualResult = find.previousSiblingItem(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = find.previousSiblingItem(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph11.id);

    expect((): void => {
      find.previousSiblingItem(dummyParagraph12, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
