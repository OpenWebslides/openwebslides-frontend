// @flow

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

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

  it(`returns the correct topic for the given id, when the given id is valid`, (): void => {
    const topic = selectors.getById(dummyState, { id: dummyTopic1.id });
    expect(topic).toBe(dummyTopic1);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const topic = selectors.getById(dummyState, { id: 'jihgfedcba' });
    expect(topic).toBeNull();
  });

});
