// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import addSaga from '../add';
import editSaga from '../edit';
import toggleEditingSaga from '../toggleEditing';
import moveSaga from '../move';
import indentSaga from '../indent';
import reverseIndentSaga from '../reverseIndent';
import removeSaga from '../remove';
import removeAndTogglePreviousItemSaga from '../removeAndTogglePreviousItem';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {

  it(`takes every ADD action and forks addSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.ADD, addSaga)
      .silentRun();
  });

  it(`takes every EDIT action and forks editSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.EDIT, editSaga)
      .silentRun();
  });

  it(`takes every TOGGLE_EDITING action and forks toggleEditing`, (): void => {
    return expectSaga(taskSaga)
      .take(t.TOGGLE_EDITING, toggleEditingSaga)
      .silentRun();
  });

  it(`takes every MOVE action and forks moveSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.MOVE, moveSaga)
      .silentRun();
  });

  it(`takes every INDENT action and forks indentSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.INDENT, indentSaga)
      .silentRun();
  });

  it(`takes every REVERSE_INDENT action and forks reverseIndentSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.REVERSE_INDENT, reverseIndentSaga)
      .silentRun();
  });

  it(`takes every REMOVE action and forks removeSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.REMOVE, removeSaga)
      .silentRun();
  });

  it(`takes every REMOVE_AND_TOGGLE_PREVIOUS_ITEM action and forks removeAndTogglePreviousItemSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.REMOVE_AND_TOGGLE_PREVIOUS_ITEM, removeAndTogglePreviousItemSaga)
      .silentRun();
  });

});
