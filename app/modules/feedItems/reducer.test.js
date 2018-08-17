// @flow

import reducer from './reducer';
import * as a from './actionTypes';
import * as m from './model';

describe(`reducer`, (): void => {
  it(`handles SET_EVENTS action`, (): void => {
    const setEventsAction: a.SetEventsAction = {
      type: a.SET_EVENTS,
      payload: {
        items: [{
          id: '1',
          userId: '1',
          topicId: '1',
          type: m.feedItemTypes.CREATE,
          timestamp: 1524490428,
        }],
      },
    };

    const nextState: m.FeedItemsState = {
      byId: {
        '1': {
          id: '1',
          userId: '1',
          topicId: '1',
          type: m.feedItemTypes.CREATE,
          timestamp: 1524490428,
        },
      },
    };

    expect(reducer({ byId: {} }, setEventsAction)).toEqual(nextState);
  });

  it(`handles empty SET_EVENTS action`, (): void => {
    const setEventsAction: a.SetEventsAction = {
      type: a.SET_EVENTS,
      payload: {
        items: null,
      },
    };

    expect(reducer({ byId: {} }, setEventsAction)).toEqual({ byId: {} });
  });
});
