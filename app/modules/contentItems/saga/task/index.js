// @flow

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import add from './add';
import edit from './edit';
import toggleEditing from './toggleEditing';
import move from './move';
import indent from './indent';
import reverseIndent from './reverseIndent';
import remove from './remove';
import removeAndTogglePreviousItem from './removeAndTogglePreviousItem';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD, add),
    takeEvery(a.EDIT, edit),
    takeEvery(a.TOGGLE_EDITING, toggleEditing),
    takeEvery(a.MOVE, move),
    takeEvery(a.INDENT, indent),
    takeEvery(a.REVERSE_INDENT, reverseIndent),
    takeEvery(a.REMOVE, remove),
    takeEvery(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, removeAndTogglePreviousItem),
  ]);
};

const taskSagas = {
  add,
  edit,
  toggleEditing,
  move,
  indent,
  reverseIndent,
  remove,
  removeAndTogglePreviousItem,
};

export { taskSagas };
export default taskSaga;
