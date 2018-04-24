// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import addSaga from '../add';
import editPlainTextSaga from '../editPlainText';
import editMediaSaga from '../editMedia';
import moveSaga from '../move';
import removeSaga from '../remove';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {

  it(`takes every ADD action and forks addSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.ADD, addSaga)
      .silentRun();
  });

  it(`takes every EDIT_PLAIN_TEXT action and forks editPlainTextSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.EDIT_PLAIN_TEXT, editPlainTextSaga)
      .silentRun();
  });

  it(`takes every EDIT_MEDIA action and forks editMediaSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.EDIT_MEDIA, editMediaSaga)
      .silentRun();
  });

  it(`takes every MOVE action and forks moveSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.MOVE, moveSaga)
      .silentRun();
  });

  it(`takes every REMOVE action and forks removeSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.REMOVE, removeSaga)
      .silentRun();
  });

});
