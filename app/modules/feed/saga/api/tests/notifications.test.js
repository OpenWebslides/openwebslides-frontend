// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { NotificationsApi } from 'lib/api';

import * as t from '../../../actionTypes';
import { apiGetNotificationsSaga } from '../notifications';

describe(` notifications`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  describe(`apiGetNotificationsSaga`, (): void => {

    it(`calls AuthApi.getAll and puts SET_FEED_ITEMS action`, (): void => {
      const dummyData = {
        data: [
          {
            id: '1',
            type: 'notifications',
            attributes: {
              eventType: 'topic_created',
            },
            relationships: {
              user: {
                data: {
                  id: '1',
                },
              },
              topic: {
                data: {
                  id: '1',
                },
              },
            },
            meta: {
              createdAt: 1524490428,
            },
          },
        ],
      };

      fetch.mockResponseOnce(JSON.stringify(dummyData), { status: 200 });

      const dummyGetNotificationsAction: t.ApiGetNotificationsAction = {
        type: t.API_GET_NOTIFICATIONS,
      };

      return expectSaga(apiGetNotificationsSaga, dummyGetNotificationsAction)
        .call(NotificationsApi.getAll)
        .put.like({ action: { type: t.SET_EVENTS } })
        .run();
    });

  });
});
