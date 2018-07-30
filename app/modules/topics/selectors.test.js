// @flow

import { getById, getAllById, getAll } from './selectors';
import * as m from './model';

describe(`selectors`, (): void => {

  const dummyTopic1: m.Topic = {
    id: 'abcdefghij',
    userId: 'wxcvbnqsdf',
    title: 'dummy topic 1',
    description: 'Lorem ipsum dolor sit amet.',
    rootContentItemId: 'abcdefghij',
  };
  const dummyTopic2: m.Topic = {
    id: 'klmnopqrst',
    userId: 'qsdfghjklm',
    title: 'dummy topic 2',
    description: '',
    rootContentItemId: 'abcdefghij',
  };
  const dummyTopicsById: m.TopicsById = {
    [dummyTopic1.id]: dummyTopic1,
    [dummyTopic2.id]: dummyTopic2,
  };
  const dummyTopicsState: m.TopicsState = {
    byId: dummyTopicsById,
  };
  const dummyState: any = {
    modules: {
      topics: dummyTopicsState,
    },
  };
  const dummyEmptyState: any = {
    modules: {
      topics: {
        byId: {},
      },
    },
  };

  describe(`getById`, (): void => {

    it(`returns the correct topic for the given id, when the given id is valid`, (): void => {
      const topic = getById(dummyState, { id: dummyTopic1.id });
      expect(topic).toBe(dummyTopic1);
    });

    it(`returns NULL, when the given id is invalid`, (): void => {
      const topic = getById(dummyState, { id: 'jihgfedcba' });
      expect(topic).toBeNull();
    });

  });

  describe(`getAllById`, (): void => {

    it(`returns an object mapping all topic ids to their topics, when there are one or more topics in the state`, (): void => {
      const topicsById = getAllById(dummyState);
      expect(topicsById).toBe(dummyTopicsById);
    });

    it(`returns an empty object, when there are no topics in the state`, (): void => {
      const topicsById = getAllById(dummyEmptyState);
      expect(topicsById).toEqual({});
    });

  });

  describe(`getAll`, (): void => {

    it(`returns an array containing all topics, when there are one or more topics in the state`, (): void => {
      const topics = getAll(dummyState);
      expect(topics).toEqual([dummyTopic1, dummyTopic2]);
    });

    it(`returns an empty array, when there are no topics in the state`, (): void => {
      const topics = getAll(dummyEmptyState);
      expect(topics).toEqual([]);
    });

  });

});
