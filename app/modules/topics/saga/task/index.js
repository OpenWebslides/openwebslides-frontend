// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import create from './create';
import edit from './edit';
import fetch from './fetch';
import load from './load';
import remove from './remove';
import save from './save';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, create),
    takeEvery(a.EDIT, edit),
    takeEvery(a.FETCH, fetch),
    takeEvery(a.LOAD, load),
    takeEvery(a.REMOVE, remove),
    takeEvery(a.SAVE, save),
  ]);
};

const taskSagas = {
  create,
  edit,
  fetch,
  load,
  remove,
  save,
};

export { taskSagas };
export default taskSaga;
