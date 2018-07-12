// @flow

import _ from 'lodash';

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';

import * as m from '../../../model';
import { dummyContentItemData as dummyData } from '../../testResources';

import find from '..';

describe(`findNextSiblingItem`, (): void => {

  let dummyParagraph22: $Exact<m.ParagraphContentItem>;
  let dummyParagraph21: $Exact<m.ParagraphContentItem>;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph12: $Exact<m.ParagraphContentItem>;
  let dummyParagraph11: $Exact<m.ParagraphContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: $Exact<m.ContentItemsById>;

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

  it(`returns the next siblingItem, when the passed contentItem is a subItem and not the last in its list of siblings`, (): void => {
    const actualResult = find.nextSiblingItem(dummyParagraph11, dummyContentItemsById);
    const expectedResult = dummyParagraph12;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns the next siblingItem, when the passed contentItem is a childItem and not the last in its list of siblings`, (): void => {
    const actualResult = find.nextSiblingItem(dummyHeading1, dummyContentItemsById);
    const expectedResult = dummyHeading2;
    expect(actualResult).toBe(expectedResult);
  });

  it(`returns NULL, when the passed contentItem is the last in its list of siblings`, (): void => {
    const actualResult = find.nextSiblingItem(dummyParagraph12, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is neither a child- nor a subItem (i.e. is a ROOT)`, (): void => {
    const actualResult = find.nextSiblingItem(dummyRoot, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`returns NULL, when the passed contentItem is NULL`, (): void => {
    const actualResult = find.nextSiblingItem(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    dummyContentItemsById = _.omit(dummyContentItemsById, dummyParagraph12.id);

    expect((): void => {
      find.nextSiblingItem(dummyParagraph11, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

});
