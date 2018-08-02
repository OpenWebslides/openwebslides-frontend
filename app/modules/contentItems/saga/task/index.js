// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import add from './add';
import edit from './edit';
import indent from './indent';
import move from './move';
import remove from './remove';
import removeAndTogglePreviousItem from './removeAndTogglePreviousItem';
import reverseIndent from './reverseIndent';
import toggleEditing from './toggleEditing';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD, add),
    takeEvery(a.EDIT, edit),
    takeEvery(a.INDENT, indent),
    takeEvery(a.MOVE, move),
    takeEvery(a.REMOVE, remove),
    takeEvery(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, removeAndTogglePreviousItem),
    takeEvery(a.REVERSE_INDENT, reverseIndent),
    takeEvery(a.TOGGLE_EDITING, toggleEditing),
  ]);
};

const taskSagas = {
  add,
  edit,
  indent,
  move,
  remove,
  removeAndTogglePreviousItem,
  reverseIndent,
  toggleEditing,
};

export { taskSagas };
export default taskSaga;
