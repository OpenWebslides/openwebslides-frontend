// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import accept from './accept';
import create from './create';
import fetch from './fetch';
import reject from './reject';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ACCEPT, sagaWrapper, accept),
    takeEvery(a.CREATE, sagaWrapper, create),
    takeEvery(a.FETCH, sagaWrapper, fetch),
    takeEvery(a.REJECT, sagaWrapper, reject),
  ]);
};

const taskSagas = {
  accept,
  create,
  fetch,
  reject,
};

export { taskSagas };
export default taskSaga;
