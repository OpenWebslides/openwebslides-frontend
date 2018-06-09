// @flow

import getAllDescendants from '..';

import { contentItemTypes } from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById, ContentItem,
} from '../../../model';

describe(`getAllDescendants`, (): void => {


  const dummyRoot1: $Exact<RootContentItem> = {
    id: 'kj3094k2mj',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: ['k295jck2k2'],
  };
  const dummyRoot2: $Exact<RootContentItem> = {
    id: 'e85loehjc6',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: ['kd92mj5bch', 'fs04f2lvgt'],
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    id: 'kd92mj5bch',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['j210fj450f'],
  };
  const dummyHeading2: $Exact<HeadingContentItem> = {
    id: 'k295jck2k2',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    id: 'fs04f2lvgt',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyParagraph2: $Exact<ParagraphContentItem> = {
    id: 'j210fj450f',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };

  const dummyContentItemsById: ContentItemsById = {
    [dummyRoot1.id]: dummyRoot1,
    [dummyRoot2.id]: dummyRoot2,
    [dummyHeading1.id]: dummyHeading1,
    [dummyHeading2.id]: dummyHeading2,
    [dummyParagraph1.id]: dummyParagraph1,
    [dummyParagraph2.id]: dummyParagraph2,
  };

  it(`returns a list of contentItems, when the passed contentItem is a subable contentItem`, (): void => {
    const contentItemDescendants = getAllDescendants(dummyHeading1, dummyContentItemsById);
    const expectedResult: Array<ContentItem> = [
      dummyHeading1,
      dummyParagraph2,
    ];
    expect(contentItemDescendants).toEqual(expectedResult);
  });

  it(`returns a list of contentItems, when the passed contentItem is a container contentItem`, (): void => {
    const contentItemDescendants = getAllDescendants(dummyRoot2, dummyContentItemsById);
    const expectedResult: Array<ContentItem> = [
      dummyRoot2,
      dummyHeading1,
      dummyParagraph2,
      dummyParagraph1,
    ];
    expect(contentItemDescendants).toEqual(expectedResult);
  });

});
