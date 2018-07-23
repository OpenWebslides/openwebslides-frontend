// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as a from '../../../actionTypes';
import type { ApiGetNotificationsAction } from '../../../actionTypes';
import fetchSaga from '../fetch';

describe(`fetch`, (): void => {
  it(`puts an apiGetNotifications action`, (): void => {
    const dummyGetNotificationsAction: ApiGetNotificationsAction = {
      type: a.API_GET_NOTIFICATIONS,
    };

    return expectSaga(fetchSaga, dummyGetNotificationsAction)
      .put.like({ action: { type: a.API_GET_NOTIFICATIONS } })
      .run();
  });
});
