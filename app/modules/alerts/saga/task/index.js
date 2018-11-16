// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import fetchAll from './fetchAll';
import markAsRead from './markAsRead';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.FETCH_ALL, sagaWrapper, fetchAll),
    takeEvery(a.MARK_AS_READ, sagaWrapper, markAsRead),
  ]);
};

const taskSagas = {
  fetchAll,
  markAsRead,
};

export { taskSagas };
export default taskSaga;
