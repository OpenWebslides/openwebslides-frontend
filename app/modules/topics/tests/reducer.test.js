// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import { dummyTopics } from '../dummyData';

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { TopicsState } from '../model';

describe(`reducer`, (): void => {

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction = {
      type: t.ADD_ERROR,
      error: {
        message: `Flow will complain if the passed action isn't some kind of valid TopicAction.`,
      },
    };

    expect(reducer(undefined, dummyAction)).toEqual(dummyTopics);
  });

  it(`handles topic ADD action`, (): void => {
    const prevState: TopicsState = {
      abcdefghij: {
        id: 'abcdefghij',
        title: 'Test topic 1',
        description: 'Lorem ipsum dolor sit amet.',
        rootContentItemId: 'abcdefghij',
      },
    };
    const addAction: t.AddAction = {
      type: t.ADD,
      payload: {
        id: 'klmnopqrst',
        title: 'Test topic 2',
        description: '',
        rootContentItemId: 'abcdefghij',
      },
    };
    const nextState: TopicsState = {
      abcdefghij: {
        id: 'abcdefghij',
        title: 'Test topic 1',
        description: 'Lorem ipsum dolor sit amet.',
        rootContentItemId: 'abcdefghij',
      },
      klmnopqrst: {
        id: 'klmnopqrst',
        title: 'Test topic 2',
        description: '',
        rootContentItemId: 'abcdefghij',
      },
    };

    expect(reducer(prevState, addAction)).toEqual(nextState);
  });

  it(`handles topic EDIT action`, (): void => {
    const prevState: TopicsState = {
      abcdefghij: {
        id: 'abcdefghij',
        title: 'Test topic 1',
        description: 'Lorem ipsum dolor sit amet.',
        rootContentItemId: 'abcdefghij',
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
      abcdefghij: {
        id: 'abcdefghij',
        title: 'Edited test topic',
        description: 'Description has been edited.',
        rootContentItemId: 'abcdefghij',
      },
    };

    expect(reducer(prevState, editAction)).toEqual(nextState);
  });

  it(`handles topic REMOVE action`, (): void => {
    const prevState: TopicsState = {
      abcdefghij: {
        id: 'abcdefghij',
        title: 'Test topic 1',
        description: 'Lorem ipsum dolor sit amet.',
        rootContentItemId: 'abcdefghij',
      },
      klmnopqrst: {
        id: 'klmnopqrst',
        title: 'Test topic 2',
        description: '',
        rootContentItemId: 'abcdefghij',
      },
    };
    const removeAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: 'klmnopqrst',
      },
    };
    const nextState: TopicsState = {
      abcdefghij: {
        id: 'abcdefghij',
        title: 'Test topic 1',
        description: 'Lorem ipsum dolor sit amet.',
        rootContentItemId: 'abcdefghij',
      },
    };

    expect(reducer(prevState, removeAction)).toEqual(nextState);
  });

  // #TODO test edge cases

});
