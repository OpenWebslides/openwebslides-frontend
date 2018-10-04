// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import add from './add';
import edit from './edit';
import generateRoot from './generateRoot';
import indent from './indent';
import move from './move';
import remove from './remove';
import removeAndTogglePreviousItem from './removeAndTogglePreviousItem';
import reverseIndent from './reverseIndent';
import toggleEditing from './toggleEditing';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD, sagaWrapper, add),
    takeEvery(a.EDIT, sagaWrapper, edit),
    takeEvery(a.GENERATE_ROOT, sagaWrapper, generateRoot),
    takeEvery(a.INDENT, sagaWrapper, indent),
    takeEvery(a.MOVE, sagaWrapper, move),
    takeEvery(a.REMOVE, sagaWrapper, remove),
    takeEvery(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, sagaWrapper, removeAndTogglePreviousItem),
    takeEvery(a.REVERSE_INDENT, sagaWrapper, reverseIndent),
    takeEvery(a.TOGGLE_EDITING, sagaWrapper, toggleEditing),
  ]);
};

const taskSagas = {
  add,
  edit,
  generateRoot,
  indent,
  move,
  remove,
  removeAndTogglePreviousItem,
  reverseIndent,
  toggleEditing,
};

export { taskSagas };
export default taskSaga;
