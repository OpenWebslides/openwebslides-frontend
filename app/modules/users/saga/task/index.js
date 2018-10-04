// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD_TOPIC, sagaWrapper, addTopic),
    takeEvery(a.ADD_TOPIC_ID, sagaWrapper, addTopicId),
    takeEvery(a.FETCH, sagaWrapper, fetch),
    takeEvery(a.REMOVE_TOPIC, sagaWrapper, removeTopic),
    takeEvery(a.REMOVE_TOPIC_ID, sagaWrapper, removeTopicId),
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
