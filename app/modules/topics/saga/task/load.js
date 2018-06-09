// @flow

import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiGet, apiGetContent } from '../../actions';

const loadSaga = function* (action: t.LoadContentAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  yield put(apiGet(id));
  yield put(apiGetContent(id));
};

export default loadSaga;
