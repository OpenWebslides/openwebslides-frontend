// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { FeedState } from '../model';
import { predicate } from '../model';

describe(`reducer`, (): void => {
  it(`handles SET_EVENTS action`, (): void => {
    const setEventsAction: t.SetEventsAction = {
      type: t.SET_EVENTS,
      payload: {
        items: [{
          id: '1',
          userId: '1',
          topicId: '1',
          predicate: predicate.CREATE,
          timestamp: 1524490428,
        }],
      },
    };

    const nextState: FeedState = {
      '1': {
        id: '1',
        userId: '1',
        topicId: '1',
        predicate: predicate.CREATE,
        timestamp: 1524490428,
      },
    };

    expect(reducer({}, setEventsAction)).toEqual(nextState);
  });

  it(`handles empty SET_EVENTS action`, (): void => {
    const setEventsAction: t.SetEventsAction = {
      type: t.SET_EVENTS,
      payload: {
        items: null,
      },
    };

    expect(reducer({}, setEventsAction)).toEqual({});
  });
});
