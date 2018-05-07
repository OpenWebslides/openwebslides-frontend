// @flow

import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiGetTopicContent } from '../../actions';

const loadSaga = function* (action: t.LoadContentAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  yield put(apiGetTopicContent(id));
};

export default loadSaga;
