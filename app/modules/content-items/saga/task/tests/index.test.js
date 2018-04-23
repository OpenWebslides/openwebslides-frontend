// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import createSaga from '../create';
import updatePlainTextSaga from '../updatePlainText';
import updateMediaSaga from '../updateMedia';
import moveSaga from '../move';
import destroySaga from '../destroy';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {

  it(`takes every CREATE action and forks createSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.CREATE, createSaga)
      .silentRun();
  });

  it(`takes every UPDATE_PLAIN_TEXT action and forks updatePlainTextSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.UPDATE_PLAIN_TEXT, updatePlainTextSaga)
      .silentRun();
  });

  it(`takes every UPDATE_MEDIA action and forks updateMediaSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.UPDATE_MEDIA, updateMediaSaga)
      .silentRun();
  });

  it(`takes every MOVE action and forks moveSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.MOVE, moveSaga)
      .silentRun();
  });

  it(`takes every DESTROY action and forks destroySaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.DESTROY, destroySaga)
      .silentRun();
  });

});
