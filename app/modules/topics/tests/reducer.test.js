// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import { dummyTopicsById } from '../dummyData';

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
  const dummyInitialState = {
    byId: dummyTopicsById,
  };

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction = {
      type: t.ADD_ERROR,
      error: {
        message: `Flow will complain if the passed action isn't some kind of valid TopicAction.`,
      },
    };

    expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
  });

  it(`handles topic ADD action`, (): void => {
    const prevState: TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };
    const addAction: t.AddAction = {
      type: t.ADD,
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

    expect(reducer(prevState, addAction)).toEqual(nextState);
  });

  it(`handles topic EDIT action`, (): void => {
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
    const editAction: t.EditAction = {
      type: t.EDIT,
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

  it(`handles topic REMOVE action`, (): void => {
    const prevState: TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const removeAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyTopic2.id,
      },
    };
    const nextState: TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };

    expect(reducer(prevState, removeAction)).toEqual(nextState);
  });

  // #TODO test edge cases

});
