// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`reducer`, (): void => {

  const dummyTopic1: m.Topic = {
    id: 'abcdefghij',
    userId: 'wxcvbnqsdf',
    title: 'dummy topic 1',
    description: 'Lorem ipsum dolor sit amet.',
    rootContentItemId: 'abcdefghij',
  };

  it(`handles topic ADD_TO_STATE action`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };
    const addToStateAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: 'klmnopqrst',
        userId: 'qsdfghjklm',
        title: 'Test topic 2',
        description: '',
        rootContentItemId: 'abcdefghij',
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        klmnopqrst: {
          id: 'klmnopqrst',
          userId: 'qsdfghjklm',
          title: 'Test topic 2',
          description: '',
          rootContentItemId: 'abcdefghij',
        },
      },
    };

    expect(reducer(prevState, addToStateAction)).toEqual(nextState);
  });

});
