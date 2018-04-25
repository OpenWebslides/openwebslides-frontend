// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiGetNotificationsSaga } from './notifications';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_GET_NOTIFICATIONS, apiGetNotificationsSaga),
  ]);
};

export default apiSaga;
