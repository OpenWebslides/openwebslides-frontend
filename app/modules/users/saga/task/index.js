// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequestSagaWrapper from 'lib/asyncRequestSagaWrapper';

import * as a from '../../actionTypes';

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD_TOPIC, asyncRequestSagaWrapper, addTopic),
    takeEvery(a.ADD_TOPIC_ID, asyncRequestSagaWrapper, addTopicId),
    takeEvery(a.FETCH, asyncRequestSagaWrapper, fetch),
    takeEvery(a.REMOVE_TOPIC, asyncRequestSagaWrapper, removeTopic),
    takeEvery(a.REMOVE_TOPIC_ID, asyncRequestSagaWrapper, removeTopicId),
  ]);
};

const taskSagas = {
  addTopic,
  addTopicId,
  fetch,
  removeTopic,
  removeTopicId,
};

export { taskSagas };
export default taskSaga;
