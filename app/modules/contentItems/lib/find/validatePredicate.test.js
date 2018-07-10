// @flow

import * as model from '../../model';
import * as dummyData from '../../lib/testResources/dummyContentItemData';

import validatePredicate from './validatePredicate';

const {
  contentItemTypes,
  ContentItem,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} = model;

describe(`validatePredicate`, (): void => {

  let dummyPredicate: any;
  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;

  beforeEach((): void => {
    dummyPredicate = jest.fn((contentItem: ContentItem): boolean => (contentItem.type === contentItemTypes.HEADING));

    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem4, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
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

  it(`returns the return value of the passed predicate function when called with the passed arguments`, (): void => {
    const dummyArguments = [
      dummyParagraph11,
      [dummyRoot.id, dummyHeading1.id],
      dummyContentItemsById,
    ];
    const expectedResult = dummyPredicate(...dummyArguments);
    const actualResult = validatePredicate(dummyPredicate, ...dummyArguments);
    expect(actualResult).toBe(expectedResult);
    expect(dummyPredicate).toHaveBeenCalledWith(...dummyArguments);
  });

  it(`returns TRUE, when the passed predicate is NULL`, (): void => {
    const actualResult = validatePredicate(
      null,
      dummyParagraph11,
      [dummyRoot.id, dummyHeading1.id],
      dummyContentItemsById,
    );
    expect(actualResult).toBe(true);
  });

});
