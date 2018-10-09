// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyTopicData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setDirtyInState`, (): void => {

  let dummyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isDirty: false };
  });

  it(`sets the isDirty property to TRUE when passed TRUE for the topic with the passed id`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: dummyTopic,
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: dummyTopic.id,
        dirty: true,
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: { ...dummyTopic, isDirty: true },
      },
    };
    const resultState = reducer(prevState, setDirtyInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic.id]).not.toBe(prevState.byId[dummyTopic.id]);
  });

  it(`sets the isDirty property to FALSE when passed FALSE for the topic with the passed id`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: dummyTopic,
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: dummyTopic.id,
        dirty: false,
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: { ...dummyTopic, isDirty: false },
      },
    };
    const resultState = reducer(prevState, setDirtyInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic.id]).not.toBe(prevState.byId[dummyTopic.id]);
  });

  it(`throws an ObjectNotFoundError, when the topic for the passed id could not be found in the state`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: { ...dummyTopic, isDirty: true },
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: 'InvalidId',
        dirty: true,
      },
    };

    expect((): void => {
      reducer(prevState, setDirtyInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
