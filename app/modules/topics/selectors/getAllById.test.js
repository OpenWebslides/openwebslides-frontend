// @flow

import * as m from '../model';

import selectors from '.';

describe(`getAllById`, (): void => {

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

  it(`returns an object mapping all topic ids to their topics, when there are one or more topics in the state`, (): void => {
    const topicsById = selectors.getAllById(dummyState);
    expect(topicsById).toBe(dummyTopicsById);
  });

  it(`returns an empty object, when there are no topics in the state`, (): void => {
    const topicsById = selectors.getAllById(dummyEmptyState);
    expect(topicsById).toEqual({});
  });

});
