// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import { apiDeleteSaga } from './delete';
import { apiGetAllByUserIdSaga, apiGetSaga } from './get';
import { apiPostSaga } from './post';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE, apiDeleteSaga),
    takeEvery(a.API_GET, apiGetSaga),
    takeEvery(a.API_GET_ALL_BY_USERID, apiGetAllByUserIdSaga),
    takeEvery(a.API_POST, apiPostSaga),
  ]);
};

export default apiSaga;
