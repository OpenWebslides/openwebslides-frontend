// @flow

import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../model';
import * as dummyContentItemData from '../lib/testResources/dummyContentItemData';

import selectors from '.';

describe(`getCurrentlyEditing`, (): void => {

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
    dummyParagraph22 = { ...dummyContentItemData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyContentItemData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyContentItemData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyContentItemData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyContentItemData.paragraphContentItem };
    dummyHeading1 = { ...dummyContentItemData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyContentItemData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
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

  it(`returns the contentItem for which the isEditing value is currently TRUE`, (): void => {
    dummyHeading1.isEditing = true;
    expect(selectors.getCurrentlyEditing(dummyState)).toBe(dummyHeading1);
  });

  it(`returns NULL, when there is no contentItem for which the isEditing value is currently TRUE`, (): void => {
    expect(selectors.getCurrentlyEditing(dummyState)).toBeNull();
  });

});
