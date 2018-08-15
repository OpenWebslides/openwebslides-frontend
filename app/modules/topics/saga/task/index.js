// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import create from './create';
import edit from './edit';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import patchWithContent from './patchWithContent';
import remove from './remove';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, create),
    takeEvery(a.EDIT, edit),
    takeEvery(a.FETCH, fetch),
    takeEvery(a.FETCH_WITH_CONTENT, fetchWithContent),
    takeEvery(a.PATCH_WITH_CONTENT, patchWithContent),
    takeEvery(a.REMOVE, remove),
  ]);
};

const taskSagas = {
  create,
  edit,
  fetch,
  fetchWithContent,
  patchWithContent,
  remove,
};

export { taskSagas };
export default taskSaga;
