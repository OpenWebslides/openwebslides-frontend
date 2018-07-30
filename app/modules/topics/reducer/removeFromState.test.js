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
  const dummyTopic2: m.Topic = {
    id: 'klmnopqrst',
    userId: 'qsdfghjklm',
    title: 'dummy topic 2',
    description: '',
    rootContentItemId: 'abcdefghij',
  };

  it(`handles topic REMOVE_FROM_STATE action`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyTopic2.id,
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };

    expect(reducer(prevState, removeFromStateAction)).toEqual(nextState);
  });

});
