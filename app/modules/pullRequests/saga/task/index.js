// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import fetch from './fetch';
import submit from './submit';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.FETCH, sagaWrapper, fetch),
  ]);
};

const taskSagas = {
  fetch,
  submit,
};

export { taskSagas };
export default taskSaga;
