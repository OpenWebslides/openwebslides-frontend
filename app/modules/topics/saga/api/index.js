// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiDeleteSaga } from './delete';
import { apiGetAllByUserIdSaga, apiGetSaga } from './get';
import { apiPostSaga } from './post';
import { apiPatchContentSaga } from './patchContent';
import { apiGetContentSaga } from './getContent';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.API_DELETE, apiDeleteSaga),
    takeEvery(t.API_GET, apiGetSaga),
    takeEvery(t.API_GET_ALL_BY_USERID, apiGetAllByUserIdSaga),
    takeEvery(t.API_POST, apiPostSaga),
    takeEvery(t.API_PATCH_CONTENT, apiPatchContentSaga),
    takeEvery(t.API_GET_CONTENT, apiGetContentSaga),
  ]);
};

export default apiSaga;
