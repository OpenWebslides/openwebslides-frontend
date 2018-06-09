// @flow

import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiDeleteSaga } from './delete';
import { apiGetAllByUserIdByUserIdSaga, apiGetSaga } from './get';
import { apiPostSaga } from './post';
import { apiPatchContentSaga } from './patchContent';
import { apiGetContentSaga } from './getContent';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_DELETE, apiDeleteSaga),
    takeEvery(t.API_GET, apiGetSaga),
    takeLatest(t.API_GET_ALL_BY_USERID, apiGetAllByUserIdByUserIdSaga),
    takeLatest(t.API_POST, apiPostSaga),
    takeLatest(t.API_PATCH_CONTENT, apiPatchContentSaga),
    takeLatest(t.API_GET_CONTENT, apiGetContentSaga),
  ]);
};

export default apiSaga;
