// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import create from './create';
import edit from './edit';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import patchWithContent from './patchWithContent';
import remove from './remove';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, asyncRequests.lib.sagaWrapper, create),
    takeEvery(a.EDIT, asyncRequests.lib.sagaWrapper, edit),
    takeEvery(a.FETCH, asyncRequests.lib.sagaWrapper, fetch),
    takeEvery(a.FETCH_WITH_CONTENT, asyncRequests.lib.sagaWrapper, fetchWithContent),
    takeEvery(a.PATCH_WITH_CONTENT, asyncRequests.lib.sagaWrapper, patchWithContent),
    takeEvery(a.REMOVE, asyncRequests.lib.sagaWrapper, remove),
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
