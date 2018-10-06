// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import create from './create';
import discard from './discard';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import fork from './fork';
import remove from './remove';
import update from './update';
import updateContent from './updateContent';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, sagaWrapper, create),
    takeEvery(a.DISCARD, sagaWrapper, discard),
    takeEvery(a.FETCH, sagaWrapper, fetch),
    takeEvery(a.FETCH_WITH_CONTENT, sagaWrapper, fetchWithContent),
    takeEvery(a.FORK, sagaWrapper, fork),
    takeEvery(a.REMOVE, sagaWrapper, remove),
    takeEvery(a.UPDATE, sagaWrapper, update),
    takeEvery(a.UPDATE_CONTENT, sagaWrapper, updateContent),
  ]);
};

const taskSagas = {
  create,
  discard,
  fetch,
  fetchWithContent,
  fork,
  remove,
  update,
  updateContent,
};

export { taskSagas };
export default taskSaga;
