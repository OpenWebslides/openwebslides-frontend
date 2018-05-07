// @flow

import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import addSaga from './add';
import editSaga from './edit';
import getSaga from './get';
import getAllSaga from './getAll';
import removeSaga from './remove';
import saveSaga from './save';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.ADD, addSaga),
    takeEvery(t.EDIT, editSaga),
    takeEvery(t.GET, getSaga),
    takeEvery(t.GET_ALL_BY_USERID, getAllSaga),
    takeLatest(t.REMOVE, removeSaga),
    takeLatest(t.SAVE_CONTENT, saveSaga),
  ]);
};

export default taskSaga;
