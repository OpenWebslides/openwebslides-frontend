// @flow

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
