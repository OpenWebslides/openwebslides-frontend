// @flow

import { call, put } from 'redux-saga/effects';

import { FETCH_FEED_SUCCESS, FETCH_FEED_FAILURE } from './actionTypes';
import * as Api from './api';

export function* fetch() {
  try {
    const data = yield call(Api.fetch);
    yield put({ type: FETCH_FEED_SUCCESS, data })
   } catch (error) {
    yield put({ type: FETCH_FEED_FAILURE, error })
   }
};
