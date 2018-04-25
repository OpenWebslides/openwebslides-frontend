// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiGetTopics } from '../../actions';

const fetchSaga = function* (action: t.FetchAction): Generator<*, *, *> {
  yield put(apiGetTopics());
};

export default fetchSaga;
