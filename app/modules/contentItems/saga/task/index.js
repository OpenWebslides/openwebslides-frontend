// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequestSagaWrapper from 'lib/asyncRequestSagaWrapper';

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
    takeEvery(a.ADD, asyncRequestSagaWrapper, add),
    takeEvery(a.EDIT, asyncRequestSagaWrapper, edit),
    takeEvery(a.INDENT, asyncRequestSagaWrapper, indent),
    takeEvery(a.MOVE, asyncRequestSagaWrapper, move),
    takeEvery(a.REMOVE, asyncRequestSagaWrapper, remove),
    takeEvery(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, asyncRequestSagaWrapper, removeAndTogglePreviousItem),
    takeEvery(a.REVERSE_INDENT, asyncRequestSagaWrapper, reverseIndent),
    takeEvery(a.TOGGLE_EDITING, asyncRequestSagaWrapper, toggleEditing),
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
