// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import create from './create';
import fetch from './fetch';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CREATE, sagaWrapper, create),
    takeEvery(a.FETCH, sagaWrapper, fetch),
  ]);
};

const taskSagas = {
  create,
  fetch,
};

export { taskSagas };
export default taskSaga;
