// @flow

import contentItemsModule from 'modules/content-items';
import { getById, getAllById, getAll, getDenormalizedById, getNormalizedById } from '../selectors';
import { contentItemTypes } from '../model';
import type {
  RootContentItem,
  DenormalizedRootContentItem,
  HeadingContentItem,
  DenormalizedHeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../model';

const { ContentItem } = contentItemsModule.model;

describe(`selectors`, (): void => {

  const dummyHeading1: $Exact<HeadingContentItem> = {
    id: 'qflasjgtxr',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyRoot2: $Exact<RootContentItem> = {
    id: 'w4lg2u0p1h',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: ['qflasjgtxr'],
  };
  const dummyRoot1: $Exact<RootContentItem> = {
    id: 'qyrgv0bcd6',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: [],
  };
  const dummyRoot3: $Exact<RootContentItem> = {
    id: 'e85loehjc6',
    type: contentItemTypes.ROOT,
    childItemIds: ['kd92mj5bch', 'fs04f2lvgt'],
  };
  const dummyHeading2: $Exact<HeadingContentItem> = {
    id: 'kd92mj5bch',
    type: contentItemTypes.HEADING,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['j210fj450f'],
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    id: 'fs04f2lvgt',
    type: contentItemTypes.PARAGRAPH,
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
    [dummyRoot3.id]: dummyRoot3,
    [dummyHeading1.id]: dummyHeading1,
    [dummyHeading2.id]: dummyHeading2,
    [dummyParagraph1.id]: dummyParagraph1,
    [dummyParagraph2.id]: dummyParagraph2,
  };
  const dummyContentItemsState: ContentItemsState = {
    byId: dummyContentItemsById,
  };
  const dummyState: any = {
    modules: {
      contentItems: dummyContentItemsState,
    },
  };
  const dummyEmptyState: any = {
    modules: {
      contentItems: {
        byId: {},
      },
    },
  };

  describe(`getById`, (): void => {

    it(`returns the correct contentItem for the given id, when the given id is valid`, (): void => {
      const contentItem = getById(dummyState, { id: dummyRoot1.id });
      expect(contentItem).toBe(dummyRoot1);
    });

    it(`returns NULL, when the given id is invalid`, (): void => {
      const contentItem = getById(dummyState, { id: 'jihgfedcba' });
      expect(contentItem).toBeNull();
    });

  });

  describe(`getAllById`, (): void => {

    it(`returns an object mapping all contentItem ids to their contentItems, when there are one or more contentItems in the state`, (): void => {
      const contentItemsById = getAllById(dummyState);
      expect(contentItemsById).toBe(dummyContentItemsById);
    });

    it(`returns an empty object, when there are no contentItems in the state`, (): void => {
      const contentItemsById = getAllById(dummyEmptyState);
      expect(contentItemsById).toEqual({});
    });

  });

  describe(`getAll`, (): void => {

    it(`returns an array containing all contentItems, when there are one or more contentItems in the state`, (): void => {
      const contentItems = getAll(dummyState);
      expect(contentItems).toEqual([
        dummyRoot1,
        dummyRoot2,
        dummyRoot3,
        dummyHeading1,
        dummyHeading2,
        dummyParagraph1,
        dummyParagraph2,
      ]);
    });

    it(`returns an empty array, when there are no contentItems in the state`, (): void => {
      const contentItems = getAll(dummyEmptyState);
      expect(contentItems).toEqual([]);
    });

  });

  describe(`getDenormalizedById`, (): void => {

    it(`returns the correct denormalized contentItem for the given id, when the given id is valid`, (): void => {
      const denormalizedContentItem = getDenormalizedById(dummyState, { id: dummyRoot2.id });
      const expectedResult: DenormalizedRootContentItem = {
        ...dummyRoot2,
        childItems: [
          ({
            ...dummyHeading1,
            subItems: [],
          }: DenormalizedHeadingContentItem),
        ],
      };
      expect(denormalizedContentItem).toEqual(expectedResult);
    });

    it(`returns NULL, when the given id is invalid`, (): void => {
      const denormalizedContentItem = getDenormalizedById(dummyState, { id: 'jihgfedcba' });
      expect(denormalizedContentItem).toBeNull();
    });

  });

  describe(`getNormalizedById`, (): void => {

    it(`returns the correct normalized contentItems for the given id, when the given id is valid`, (): void => {
      const normalizedContentItem = getNormalizedById(dummyState, { id: dummyRoot3.id });
      const expectedResult: Array<ContentItem> = [
        dummyRoot3,
        dummyHeading2,
        dummyParagraph2,
        dummyParagraph1,
      ];

      expect(normalizedContentItem).toEqual(expectedResult);
    });

    it(`returns an empty array, when the given id is invalid`, (): void => {
      const normalizedContentItem = getNormalizedById(dummyState, { id: 'k92jkdh29d' });
      expect(normalizedContentItem).toEqual([]);
    });

  });

});
