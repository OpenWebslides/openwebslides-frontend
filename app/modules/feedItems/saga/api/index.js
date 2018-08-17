// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import { apiGetFeedItemsSaga } from './feedItems';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeLatest(a.API_GET_NOTIFICATIONS, apiGetFeedItemsSaga),
  ]);
};

export default apiSaga;
