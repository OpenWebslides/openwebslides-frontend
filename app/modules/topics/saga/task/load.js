// @flow

import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiGet, apiGetContent } from '../../actions';

const loadSaga = function* (action: a.LoadContentAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  yield put(apiGet(id));
  yield put(apiGetContent(id));
};

export default loadSaga;
