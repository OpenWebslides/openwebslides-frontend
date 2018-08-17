// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as a from '../../actionTypes';

import { apiGetNotificationsSaga } from './notifications';

import apiSaga from '..';

describe(`apiSaga`, (): void => {
  it(`takes every API_GET_NOTIFICATIONS action and forks apiGetNotificationsSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(a.API_GET_NOTIFICATIONS, apiGetNotificationsSaga)
      .silentRun();
  });
});
