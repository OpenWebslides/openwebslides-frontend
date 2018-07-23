// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as a from '../../actionTypes';

import addSaga from './add';
import editSaga from './edit';
import toggleEditingSaga from './toggleEditing';
import moveSaga from './move';
import indentSaga from './indent';
import reverseIndentSaga from './reverseIndent';
import removeSaga from './remove';
import removeAndTogglePreviousItemSaga from './removeAndTogglePreviousItem';

import taskSaga from '.';

describe(`taskSaga`, (): void => {

  it(`takes every ADD action and forks addSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.ADD, addSaga)
      .silentRun();
  });

  it(`takes every EDIT action and forks editSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.EDIT, editSaga)
      .silentRun();
  });

  it(`takes every TOGGLE_EDITING action and forks toggleEditing`, (): void => {
    return expectSaga(taskSaga)
      .take(a.TOGGLE_EDITING, toggleEditingSaga)
      .silentRun();
  });

  it(`takes every MOVE action and forks moveSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.MOVE, moveSaga)
      .silentRun();
  });

  it(`takes every INDENT action and forks indentSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.INDENT, indentSaga)
      .silentRun();
  });

  it(`takes every REVERSE_INDENT action and forks reverseIndentSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.REVERSE_INDENT, reverseIndentSaga)
      .silentRun();
  });

  it(`takes every REMOVE action and forks removeSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.REMOVE, removeSaga)
      .silentRun();
  });

  it(`takes every REMOVE_AND_TOGGLE_PREVIOUS_ITEM action and forks removeAndTogglePreviousItemSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, removeAndTogglePreviousItemSaga)
      .silentRun();
  });

});
