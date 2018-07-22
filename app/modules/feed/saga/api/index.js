// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import { apiGetNotificationsSaga } from './notifications';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(a.API_GET_NOTIFICATIONS, apiGetNotificationsSaga),
  ]);
};

export default apiSaga;
