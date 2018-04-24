// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import {
  apiPostTokenSaga,
  apiDeleteTokenSaga,
} from './token';

import { apiPostUsersSaga } from './users';
import { apiPostPasswordSaga } from './password';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_POST_TOKEN, apiPostTokenSaga),
    takeLatest(t.API_DELETE_TOKEN, apiDeleteTokenSaga),
    takeLatest(t.API_POST_USERS, apiPostUsersSaga),
    takeLatest(t.API_POST_PASSWORD, apiPostPasswordSaga),
  ]);
};

export default apiSaga;
