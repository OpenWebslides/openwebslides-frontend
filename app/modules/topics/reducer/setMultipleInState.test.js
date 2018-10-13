// @flow

import { dummyTopicData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setMultipleInState`, (): void => {

  let dummyTopic1: m.Topic;
  let dummyTopic2: m.Topic;
  let dummyTopic3: m.Topic;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopic2 = { ...dummyTopicData.topic2 };
    dummyTopic3 = { ...dummyTopicData.topic3 };
  });

  it(`sets the passed topics in the state`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        topics: [dummyTopic2, dummyTopic3],
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
        [dummyTopic3.id]: dummyTopic3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`overrides existing topics, when the id of an existing topic is the same as the id of one of the passed topics`, (): void => {
    const editedDummyTopic2 = { ...dummyTopic2, title: 'This topic has been edited' };
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        topics: [editedDummyTopic2, dummyTopic3],
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: editedDummyTopic2,
        [dummyTopic3.id]: dummyTopic3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic2.id]).not.toBe(prevState.byId[dummyTopic2.id]);
  });

  it(`returns the state unchanged, when the passed topics array is empty`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        topics: [],
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
  });

});
