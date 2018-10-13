// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyTopicData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`reducer`, (): void => {

  let dummyTopic1: m.Topic;
  let dummyTopic2: m.Topic;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopic2 = { ...dummyTopicData.topic2 };
  });

  it(`removes the topic with the passed id from the state`, (): void => {
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
    const resultState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`throws an ObjectNotFoundError, when no topic with the passed id could be found in the state`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: 'InvalidId',
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
