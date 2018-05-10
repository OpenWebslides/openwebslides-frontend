// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import addSaga from '../add';
import editSaga from '../edit';
import moveSaga from '../move';
import removeSaga from '../remove';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {

  it(`takes every ADD action and forks addSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.ADD, addSaga)
      .silentRun();
  });

  it(`takes every EDITaction and forks editSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.EDIT, editSaga)
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
