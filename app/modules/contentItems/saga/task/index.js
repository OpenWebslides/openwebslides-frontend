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

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD, asyncRequests.lib.sagaWrapper, add),
    takeEvery(a.EDIT, asyncRequests.lib.sagaWrapper, edit),
    takeEvery(a.GENERATE_ROOT, asyncRequests.lib.sagaWrapper, generateRoot),
    takeEvery(a.INDENT, asyncRequests.lib.sagaWrapper, indent),
    takeEvery(a.MOVE, asyncRequests.lib.sagaWrapper, move),
    takeEvery(a.REMOVE, asyncRequests.lib.sagaWrapper, remove),
    takeEvery(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, asyncRequests.lib.sagaWrapper, removeAndTogglePreviousItem),
    takeEvery(a.REVERSE_INDENT, asyncRequests.lib.sagaWrapper, reverseIndent),
    takeEvery(a.TOGGLE_EDITING, asyncRequests.lib.sagaWrapper, toggleEditing),
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
