// @flow

import reducer from './reducer';
import * as a from './actionTypes';
import * as m from './model';
import { dummyTopicsById } from './dummyData';

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
  const dummyInitialState: m.TopicsState = {
    byId: dummyTopicsById,
  };

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction: any = {
      type: 'DUMMY_ACTION',
    };
    expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
  });

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

  it(`handles topic EDIT_IN_STATE action`, (): void => {
    const prevState: m.TopicsState = {
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
    const editAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: 'abcdefghij',
        title: 'Edited test topic',
        description: 'Description has been edited.',
      },
    };
    const nextState: m.TopicsState = {
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

  // #TODO test edge cases

});
