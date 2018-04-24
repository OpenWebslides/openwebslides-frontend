// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import {
  apiPostTokenSaga,
  apiDeleteTokenSaga,
} from './token';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_POST_TOKEN, apiPostTokenSaga),
    takeLatest(t.API_DELETE_TOKEN, apiDeleteTokenSaga),
  ]);
};

export default apiSaga;
