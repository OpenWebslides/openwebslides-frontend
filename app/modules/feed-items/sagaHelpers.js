// @flow

import { call, put } from 'redux-saga/effects';

import { FETCH_FEED_SUCCESS, FETCH_FEED_FAILURE } from './actionTypes';
import Api from './api';

const fetch = function* (): Generator<*, *, *> {
  try {
    const data = yield call(Api.fetch);
    yield put({ type: FETCH_FEED_SUCCESS, data });
  }
  catch (error) {
    yield put({ type: FETCH_FEED_FAILURE, error });
  }
};

export {
  fetch,
};
