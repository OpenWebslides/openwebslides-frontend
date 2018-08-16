// @flow

import * as actions from './actions';
import * as a from './actionTypes';
import * as m from './model';

describe(`actions`, (): void => {
  describe(`reducer actions`, (): void => {
    describe(`setEventsInState`, (): void => {
      it(`returns set events action`, (): void => {
        const items = [
          {
            id: '1',
            userId: '1',
            topicId: '1',
            type: m.notificationTypes.CREATE,
            timestamp: 1524490428,
          },
        ];

        const action = actions.setEventsInState(items);

        expect(action).toEqual({
          type: a.SET_EVENTS,
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
          type: a.FETCH,
        });
      });
    });
  });

  describe(`API saga actions`, (): void => {
    describe(`apiGetNotifications`, (): void => {
      it(`returns get notifications action`, (): void => {
        const action = actions.apiGetNotifications();

        expect(action).toEqual({
          type: a.API_GET_NOTIFICATIONS,
        });
      });
    });
  });
});
