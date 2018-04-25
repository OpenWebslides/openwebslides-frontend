// @flow

import { expectSaga } from 'redux-saga-test-plan';

import Api from 'lib/api';

import users from 'modules/users';

import * as t from '../../../actionTypes';
import { apiGetNotificationsSaga } from '../notifications';

import FeedApi from '../../../api';

const { Response } = Api.model;

describe(` notifications`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    FeedApi.fetch = (): Promise<Response> => {
      return Promise.resolve({
        body: {
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
          included: [{
            id: '1',
            attributes: {
              id: '1',
              firstName: 'Foo',
            },
          }],
        },
        token: 'foobartoken',
        status: 200,
      });
    };
  });

  describe(`apiGetNotificationsSaga`, (): void => {
    it(`calls AuthApi.fetch and puts two action`, (): void => {
      const dummyGetNotificationsAction: t.ApiGetNotificationsAction = {
        type: t.API_GET_NOTIFICATIONS,
      };

      return expectSaga(apiGetNotificationsSaga, dummyGetNotificationsAction)
        .call(FeedApi.fetch)
        .put.like({ action: { type: t.SET_FEED_ITEMS } })
        .put.like({ action: users.actions.setItemInState({
          id: '1',
          firstName: 'Foo',
        }),
        })
        .run();
    });
  });
});
