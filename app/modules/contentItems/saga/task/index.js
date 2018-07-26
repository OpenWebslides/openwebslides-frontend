// @flow

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import addSaga from './add';
import editSaga from './edit';
import toggleEditingSaga from './toggleEditing';
import moveSaga from './move';
import indentSaga from './indent';
import reverseIndentSaga from './reverseIndent';
import removeSaga from './remove';
import removeAndTogglePreviousItemSaga from './removeAndTogglePreviousItem';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD, addSaga),
    takeEvery(a.EDIT, editSaga),
    takeEvery(a.TOGGLE_EDITING, toggleEditingSaga),
    takeEvery(a.MOVE, moveSaga),
    takeEvery(a.INDENT, indentSaga),
    takeEvery(a.REVERSE_INDENT, reverseIndentSaga),
    takeEvery(a.REMOVE, removeSaga),
    takeEvery(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, removeAndTogglePreviousItemSaga),
  ]);
};

export default taskSaga;
