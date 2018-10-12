// @flow

import { dummyFeedItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setMultipleInState`, (): void => {

  let dummyFeedItem1: m.FeedItem;
  let dummyFeedItem2: m.FeedItem;
  let dummyFeedItem3: m.FeedItem;

  beforeEach((): void => {
    dummyFeedItem1 = { ...dummyData.feedItem };
    dummyFeedItem2 = { ...dummyData.feedItem2 };
    dummyFeedItem3 = { ...dummyData.feedItem3 };
  });

  it(`sets the passed feedItems in the state`, (): void => {
    const prevState: m.FeedItemsState = {
      byId: {
        [dummyFeedItem1.id]: dummyFeedItem1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        feedItems: [
          dummyFeedItem2,
          dummyFeedItem3,
        ],
      },
    };
    const nextState: m.FeedItemsState = {
      byId: {
        [dummyFeedItem1.id]: dummyFeedItem1,
        [dummyFeedItem2.id]: dummyFeedItem2,
        [dummyFeedItem3.id]: dummyFeedItem3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`overrides existing feedItems, when the id of an existing feedItem is the same as the id of one of the passed feedItems`, (): void => {
    const editedDummyFeedItem2 = { ...dummyFeedItem2, topicId: 'anotherTopicId' };
    const prevState: m.FeedItemsState = {
      byId: {
        [dummyFeedItem1.id]: dummyFeedItem1,
        [dummyFeedItem2.id]: dummyFeedItem2,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        feedItems: [
          editedDummyFeedItem2,
          dummyFeedItem3,
        ],
      },
    };
    const nextState: m.FeedItemsState = {
      byId: {
        [dummyFeedItem1.id]: dummyFeedItem1,
        [dummyFeedItem2.id]: editedDummyFeedItem2,
        [dummyFeedItem3.id]: dummyFeedItem3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`returns the state object unchanged, when the passed feedItems array is empty`, (): void => {
    const prevState: m.FeedItemsState = {
      byId: {
        [dummyFeedItem1.id]: dummyFeedItem1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        feedItems: [],
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
  });

});
