// @flow

import * as model from '../model';
import * as dummyData from '../lib/testResources/dummyContentItemData';

import selectors from '.';

const {
  ContentItem,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} = model;

describe(`getSelfAndAllDescendantsById`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
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
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };
  });

  it(`returns an array containing the contentItem itself and all its descendants, when the given id is valid`, (): void => {
    const contentItemDescendants = selectors.getSelfAndAllDescendantsById(dummyState, { id: dummyRoot.id });
    const expectedResult: Array<ContentItem> = [
      dummyRoot,
      dummyHeading1,
      dummyParagraph11,
      dummyParagraph12,
      dummyHeading2,
      dummyParagraph21,
      dummyParagraph22,
    ];

    expect(contentItemDescendants).toEqual(expectedResult);
  });

  it(`returns an array containing only the contentItem, when the contentItem doesn't have any descendants`, (): void => {
    const contentItemDescendants = selectors.getSelfAndAllDescendantsById(dummyState, { id: dummyParagraph11.id });
    const expectedResult: Array<ContentItem> = [dummyParagraph11];
    expect(contentItemDescendants).toEqual(expectedResult);
  });

  it(`returns an empty array, when the given id is invalid`, (): void => {
    const contentItemDescendants = selectors.getSelfAndAllDescendantsById(dummyState, { id: 'DefinitelyNotValidId' });
    expect(contentItemDescendants).toHaveLength(0);
  });

});
