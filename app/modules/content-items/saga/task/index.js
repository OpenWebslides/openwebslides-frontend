// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import addSaga from './add';
import editSaga from './edit';
import toggleEditingSaga from './toggleEditing';
import moveSaga from './move';
import removeSaga from './remove';
import removeAndTogglePreviousItemSaga from './removeAndTogglePreviousItem';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.ADD, addSaga),
    takeEvery(t.EDIT, editSaga),
    takeEvery(t.TOGGLE_EDITING, toggleEditingSaga),
    takeEvery(t.MOVE, moveSaga),
    takeEvery(t.REMOVE, removeSaga),
    takeEvery(t.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, removeAndTogglePreviousItemSaga),
  ]);
};

export default taskSaga;
