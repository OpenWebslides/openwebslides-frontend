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

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD_TOPIC, asyncRequests.lib.sagaWrapper, addTopic),
    takeEvery(a.ADD_TOPIC_ID, asyncRequests.lib.sagaWrapper, addTopicId),
    takeEvery(a.FETCH, asyncRequests.lib.sagaWrapper, fetch),
    takeEvery(a.REMOVE_TOPIC, asyncRequests.lib.sagaWrapper, removeTopic),
    takeEvery(a.REMOVE_TOPIC_ID, asyncRequests.lib.sagaWrapper, removeTopicId),
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
