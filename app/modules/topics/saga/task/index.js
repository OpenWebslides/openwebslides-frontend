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
import fork from './fork';
import patchWithContent from './patchWithContent';
import remove from './remove';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, sagaWrapper, create),
    takeEvery(a.EDIT, sagaWrapper, edit),
    takeEvery(a.FETCH, sagaWrapper, fetch),
    takeEvery(a.FETCH_WITH_CONTENT, sagaWrapper, fetchWithContent),
    takeEvery(a.FORK, sagaWrapper, fork),
    takeEvery(a.PATCH_WITH_CONTENT, sagaWrapper, patchWithContent),
    takeEvery(a.REMOVE, sagaWrapper, remove),
  ]);
};

const taskSagas = {
  create,
  edit,
  fetch,
  fetchWithContent,
  fork,
  patchWithContent,
  remove,
};

export { taskSagas };
export default taskSaga;
