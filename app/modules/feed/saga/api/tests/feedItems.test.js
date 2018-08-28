// @flow

import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import * as a from '../../../actionTypes';
import { apiGetFeedItemsSaga } from '../feedItems';

describe(`feedItems`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  describe(`apiGetFeedItemsSaga`, (): void => {

    it(`calls AuthApi.getAll and puts SET_FEED_ITEMS action`, (): void => {
      const dummyData = {
        data: [
          {
            id: '1',
            type: 'feedItems',
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

      const dummyGetFeedItemsAction: a.ApiGetNotificationsAction = {
        type: a.API_GET_NOTIFICATIONS,
      };

      return expectSaga(apiGetFeedItemsSaga, dummyGetFeedItemsAction)
        .call(api.feedItems.getAll)
        .put.like({ action: { type: a.SET_EVENTS } })
        .run();
    });

  });
});
