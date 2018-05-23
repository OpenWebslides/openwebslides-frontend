// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { Topic, TopicsState } from '../model';

describe(`reducer`, (): void => {

  const dummyTopic1: $Exact<Topic> = {
    id: 'abcdefghij',
    userId: 'wxcvbnqsdf',
    title: 'dummy topic 1',
    description: 'Lorem ipsum dolor sit amet.',
    rootContentItemId: 'abcdefghij',
  };
  const dummyTopic2: $Exact<Topic> = {
    id: 'klmnopqrst',
    userId: 'qsdfghjklm',
    title: 'dummy topic 2',
    description: '',
    rootContentItemId: 'abcdefghij',
  };

  it(`handles topic ADD_TO_STATE action`, (): void => {
    const prevState: TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: 'klmnopqrst',
        userId: 'qsdfghjklm',
        title: 'Test topic 2',
        description: '',
        rootContentItemId: 'abcdefghij',
      },
    };
    const nextState: TopicsState = {
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

  it(`handles topic EDIT_IN_STATE action`, (): void => {
    const prevState: TopicsState = {
      byId: {
        abcdefghij: {
          id: 'abcdefghij',
          userId: 'wxcvbnqsdf',
          title: 'dummy topic 1',
          description: 'Lorem ipsum dolor sit amet.',
          rootContentItemId: 'abcdefghij',
        },
      },
    };
    const editAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: 'abcdefghij',
        title: 'Edited test topic',
        description: 'Description has been edited.',
      },
    };
    const nextState: TopicsState = {
      byId: {
        abcdefghij: {
          id: 'abcdefghij',
          userId: 'wxcvbnqsdf',
          title: 'Edited test topic',
          description: 'Description has been edited.',
          rootContentItemId: 'abcdefghij',
        },
      },
    };

    expect(reducer(prevState, editAction)).toEqual(nextState);
  });

  it(`handles topic REMOVE_FROM_STATE action`, (): void => {
    const prevState: TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyTopic2.id,
      },
    };
    const nextState: TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };

    expect(reducer(prevState, removeFromStateAction)).toEqual(nextState);
  });

  // #TODO test edge cases

});
