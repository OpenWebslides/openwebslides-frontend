// @flow

import {
  getById,
  getAllById,
  getAll,
  getCurrentlyEditing,
  getDenormalizedById,
  getAllDescendantsById,
} from '../selectors';
import type {
  ContentItem,
  RootContentItem,
  DenormalizedRootContentItem,
  HeadingContentItem,
  DenormalizedHeadingContentItem,
  ParagraphContentItem,
  DenormalizedParagraphContentItem,
  ContentItemsById,
} from '../model';
import * as dummyContentItemData from '../lib/test-resources/dummyContentItemData';

describe(`selectors`, (): void => {

  let dummyParagraph4: $Exact<ParagraphContentItem>;
  let dummyParagraph3: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph2: $Exact<ParagraphContentItem>;
  let dummyParagraph1: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyParagraph4 = {
      ...dummyContentItemData.paragraphContentItem4,
    };
    dummyParagraph3 = {
      ...dummyContentItemData.paragraphContentItem3,
    };
    dummyHeading2 = {
      ...dummyContentItemData.headingContentItem2,
      subItemIds: [dummyParagraph3.id, dummyParagraph4.id],
    };
    dummyParagraph2 = {
      ...dummyContentItemData.paragraphContentItem2,
    };
    dummyParagraph1 = {
      ...dummyContentItemData.paragraphContentItem,
    };
    dummyHeading1 = {
      ...dummyContentItemData.headingContentItem,
      subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
    };
    dummyRoot = {
      ...dummyContentItemData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph1.id]: dummyParagraph1,
      [dummyParagraph2.id]: dummyParagraph2,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph3.id]: dummyParagraph3,
      [dummyParagraph4.id]: dummyParagraph4,
    };
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };
    dummyEmptyState = {
      modules: {
        contentItems: {
          byId: {},
        },
      },
    };
  });

  describe(`getById`, (): void => {

    it(`returns the correct contentItem for the given id, when the given id is valid`, (): void => {
      const contentItem = getById(dummyState, { id: dummyHeading1.id });
      expect(contentItem).toBe(dummyHeading1);
    });

    it(`returns NULL, when the given id is invalid`, (): void => {
      const contentItem = getById(dummyState, { id: 'abcdefghijklmnopqrst' });
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
      expect(contentItems).toEqual([dummyRoot, dummyHeading1, dummyParagraph1, dummyParagraph2, dummyHeading2, dummyParagraph3, dummyParagraph4]);
    });

    it(`returns an empty array, when there are no contentItems in the state`, (): void => {
      const contentItems = getAll(dummyEmptyState);
      expect(contentItems).toEqual([]);
    });

  });

  describe(`getCurrentlyEditing`, (): void => {

    it(`returns the contentItem for which the isEditing value is currently TRUE`, (): void => {
      dummyHeading1.isEditing = true;
      expect(getCurrentlyEditing(dummyState)).toBe(dummyHeading1);
    });

    it(`returns NULL, when there is no contentItem for which the isEditing value is currently TRUE`, (): void => {
      expect(getCurrentlyEditing(dummyState)).toBeNull();
    });

  });

  describe(`getDenormalizedById`, (): void => {

    it(`returns the correct denormalized contentItem for the given id, when the given id is valid`, (): void => {
      const denormalizedContentItem = getDenormalizedById(dummyState, { id: dummyRoot.id });
      const expectedResult: DenormalizedRootContentItem = {
        ...dummyRoot,
        childItems: [
          ({
            ...dummyHeading1,
            subItems: [
              ({
                ...dummyParagraph1,
                subItems: [],
              }: DenormalizedParagraphContentItem),
              ({
                ...dummyParagraph2,
                subItems: [],
              }: DenormalizedParagraphContentItem),
            ],
          }: DenormalizedHeadingContentItem),
          ({
            ...dummyHeading2,
            subItems: [
              ({
                ...dummyParagraph3,
                subItems: [],
              }: DenormalizedParagraphContentItem),
              ({
                ...dummyParagraph4,
                subItems: [],
              }: DenormalizedParagraphContentItem),
            ],
          }: DenormalizedHeadingContentItem),
        ],
      };
      expect(denormalizedContentItem).toEqual(expectedResult);
    });

    it(`returns NULL, when the given id is invalid`, (): void => {
      const denormalizedContentItem = getDenormalizedById(dummyState, { id: 'abcdefghijklmnopqrst' });
      expect(denormalizedContentItem).toBeNull();
    });

  });

  describe(`getAllDescendantsById`, (): void => {

    it(`returns the contentItem descendants for the given id, when the given id is valid`, (): void => {
      const contentItemDescendants = getAllDescendantsById(dummyState, { id: dummyRoot.id });
      const expectedResult: Array<ContentItem> = [
        dummyRoot,
        dummyHeading1,
        dummyParagraph1,
        dummyParagraph2,
        dummyHeading2,
        dummyParagraph3,
        dummyParagraph4,
      ];

      expect(contentItemDescendants).toEqual(expectedResult);
    });

    it(`returns an empty array, when the given id is invalid`, (): void => {
      const contentItemDescendants = getAllDescendantsById(dummyState, { id: 'DefinitelyNotValidId' });
      expect(contentItemDescendants).toEqual([]);
    });

  });

});
