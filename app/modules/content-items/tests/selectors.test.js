// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import { getById, getAllById, getAll } from '../selectors';
import { contentItemTypes } from '../model';
import type { ContentItem, ContentItemsById, ContentItemsState, RootContentItem } from '../model';

describe(`selectors`, (): void => {

  const dummyContentItem1: ContentItem = ({
    id: 'w4lg2u0p1h',
    type: contentItemTypes.ROOT,
    childItemIds: ['qflasjgtxr'],
  }: RootContentItem);
  const dummyContentItem2: ContentItem = ({
    id: 'qyrgv0bcd6',
    type: contentItemTypes.ROOT,
    childItemIds: ['j0vcu0y7vk', 'ua32xchh7q'],
  }: RootContentItem);
  const dummyContentItemsById: ContentItemsById = {
    [dummyContentItem1.id]: dummyContentItem1,
    [dummyContentItem2.id]: dummyContentItem2,
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
      const contentItem = getById(dummyState, { id: dummyContentItem1.id });
      expect(contentItem).toBe(dummyContentItem1);
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
      expect(contentItems).toEqual([dummyContentItem1, dummyContentItem2]);
    });

    it(`returns an empty array, when there are no contentItems in the state`, (): void => {
      const contentItems = getAll(dummyEmptyState);
      expect(contentItems).toEqual([]);
    });

  });

});
