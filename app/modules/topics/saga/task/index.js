// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequestSagaWrapper from 'lib/asyncRequestSagaWrapper';

import * as a from '../../actionTypes';

import create from './create';
import edit from './edit';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import patchWithContent from './patchWithContent';
import remove from './remove';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, asyncRequestSagaWrapper, create),
    takeEvery(a.EDIT, asyncRequestSagaWrapper, edit),
    takeEvery(a.FETCH, asyncRequestSagaWrapper, fetch),
    takeEvery(a.FETCH_WITH_CONTENT, asyncRequestSagaWrapper, fetchWithContent),
    takeEvery(a.PATCH_WITH_CONTENT, asyncRequestSagaWrapper, patchWithContent),
    takeEvery(a.REMOVE, asyncRequestSagaWrapper, remove),
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
