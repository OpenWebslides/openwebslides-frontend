// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apiSaga from '..';

import { apiGetFeedItemsSaga } from '../feedItems';
import * as a from '../../../actionTypes';

describe(`apiSaga`, (): void => {
  it(`takes every API_GET_FEED_ITEMS action and forks apiGetFeedItemsSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(a.API_GET_NOTIFICATIONS, apiGetFeedItemsSaga)
      .silentRun();
  });
});
