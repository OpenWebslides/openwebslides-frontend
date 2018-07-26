// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiGetNotifications } from '../../actions';

const fetchSaga = function* (action: a.FetchAction): Saga<void> {
  yield put(apiGetNotifications());
};

export default fetchSaga;
