// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import fetchAll from './fetchAll';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.FETCH_ALL, sagaWrapper, fetchAll),
  ]);
};

const taskSagas = {
  fetchAll,
};

export { taskSagas };
export default taskSaga;
