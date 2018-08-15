// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD_TOPIC, addTopic),
    takeEvery(a.ADD_TOPIC_ID, addTopicId),
    takeEvery(a.FETCH, fetch),
    takeEvery(a.REMOVE_TOPIC, removeTopic),
    takeEvery(a.REMOVE_TOPIC_ID, removeTopicId),
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
