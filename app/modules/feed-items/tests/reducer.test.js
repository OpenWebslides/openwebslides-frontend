// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { FeedItemsState } from '../model';
import { predicateTypes } from '../model';

describe(`reducer`, (): void => {
  it(`handles SET_FEED_ITEMS action`, (): void => {
    const setFeedItemsAction: t.SetFeedItemsAction = {
      type: t.SET_FEED_ITEMS,
      payload: {
        items: [{
          id: '1',
          userId: '1',
          topicId: '1',
          predicate: predicateTypes.CREATE,
          timestamp: 1524490428,
        }],
      },
    };

    const nextState: FeedItemsState = {
      '1': {
        id: '1',
        userId: '1',
        topicId: '1',
        predicate: predicateTypes.CREATE,
        timestamp: 1524490428,
      },
    };

    expect(reducer({}, setFeedItemsAction)).toEqual(nextState);
  });

  it(`handles empty SET_FEED_ITEMS action`, (): void => {
    const setFeedItemsAction: t.SetFeedItemsAction = {
      type: t.SET_FEED_ITEMS,
      payload: {
        items: null,
      },
    };

    expect(reducer({}, setFeedItemsAction)).toEqual({});
  });
});
