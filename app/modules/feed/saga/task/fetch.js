// @flow

import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiGetNotifications } from '../../actions';

const fetchSaga = function* (action: a.FetchAction): Generator<*, *, *> {
  yield put(apiGetNotifications());
};

export default fetchSaga;
