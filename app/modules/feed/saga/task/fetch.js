// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiGetNotifications } from '../../actions';

const fetchSaga = function* (action: t.FetchAction): Generator<*, *, *> {
  yield put(apiGetNotifications());
};

export default fetchSaga;
