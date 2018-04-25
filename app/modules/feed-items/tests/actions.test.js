// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

import { predicateTypes } from '../model';

describe(`actions`, (): void => {
  describe(`reducer actions`, (): void => {
    describe(`setFeedItemsInState`, (): void => {
      it(`returns set feed items action`, (): void => {
        const items = [
          {
            id: '1',
            userId: '1',
            topicId: '1',
            predicate: predicateTypes.CREATE,
            timestamp: 1524490428,
          },
        ];

        const action = actions.setFeedItemsInState(items);

        expect(action).toEqual({
          type: t.SET_FEED_ITEMS,
          payload: {
            items,
          },
        });
      });
    });
  });

  describe(`task saga actions`, (): void => {
    describe(`fetch`, (): void => {
      it(`returns fetch action`, (): void => {
        const action = actions.fetch();

        expect(action).toEqual({
          type: t.FETCH,
        });
      });
    });
  });

  describe(`API saga actions`, (): void => {
    describe(`apiGetNotifications`, (): void => {
      it(`returns get notifications action`, (): void => {
        const action = actions.apiGetNotifications();

        expect(action).toEqual({
          type: t.API_GET_NOTIFICATIONS,
        });
      });
    });
  });
});
