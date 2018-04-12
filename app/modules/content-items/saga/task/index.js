// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import createSaga from './create';
import updatePlainTextSaga from './updatePlainText';
import updateMediaSaga from './updateMedia';
import moveSaga from './move';
import destroySaga from './destroy';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.CREATE, createSaga),
    takeEvery(t.UPDATE_PLAIN_TEXT, updatePlainTextSaga),
    takeEvery(t.UPDATE_MEDIA, updateMediaSaga),
    takeEvery(t.MOVE, moveSaga),
    takeEvery(t.DESTROY, destroySaga),
  ]);
};

export default taskSaga;
