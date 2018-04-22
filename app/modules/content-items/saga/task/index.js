// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import addSaga from './add';
import editPlainTextSaga from './editPlainText';
import editMediaSaga from './editMedia';
import moveSaga from './move';
import removeSaga from './remove';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.ADD, addSaga),
    takeEvery(t.EDIT_PLAIN_TEXT, editPlainTextSaga),
    takeEvery(t.EDIT_MEDIA, editMediaSaga),
    takeEvery(t.MOVE, moveSaga),
    takeEvery(t.REMOVE, removeSaga),
  ]);
};

export default taskSaga;
