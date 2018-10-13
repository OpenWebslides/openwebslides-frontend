// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyTopicData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`toggleContentFetchedInState`, (): void => {

  let dummyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: false };
  });

  it(`sets the isContentFetched property to TRUE for the topic with the passed id`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: dummyTopic,
      },
    };
    const toggleContentFetchedInStateAction: a.ToggleContentFetchedInStateAction = {
      type: a.TOGGLE_CONTENT_FETCHED_IN_STATE,
      payload: {
        id: dummyTopic.id,
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: { ...dummyTopic, isContentFetched: true },
      },
    };
    const resultState = reducer(prevState, toggleContentFetchedInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic.id]).not.toBe(prevState.byId[dummyTopic.id]);
  });

  it(`returns the state object unchanged, when the topic's isContentFetched property was already TRUE`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: { ...dummyTopic, isContentFetched: true },
      },
    };
    const toggleContentFetchedInStateAction: a.ToggleContentFetchedInStateAction = {
      type: a.TOGGLE_CONTENT_FETCHED_IN_STATE,
      payload: {
        id: dummyTopic.id,
      },
    };
    const resultState = reducer(prevState, toggleContentFetchedInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyTopic.id]).toBe(prevState.byId[dummyTopic.id]);
  });

  it(`throws an ObjectNotFoundError, when the topic for the passed id could not be found in the state`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic.id]: { ...dummyTopic, isContentFetched: true },
      },
    };
    const toggleContentFetchedInStateAction: a.ToggleContentFetchedInStateAction = {
      type: a.TOGGLE_CONTENT_FETCHED_IN_STATE,
      payload: {
        id: 'InvalidId',
      },
    };

    expect((): void => {
      reducer(prevState, toggleContentFetchedInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
