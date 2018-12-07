// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import forkTopic from './forkTopic';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';
import signup from './signup';
import update from './update';
import updatePassword from './updatePassword';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.ADD_TOPIC, sagaWrapper, addTopic),
    takeEvery(a.ADD_TOPIC_ID, sagaWrapper, addTopicId),
    takeEvery(a.FETCH, sagaWrapper, fetch),
    takeEvery(a.FORK_TOPIC, sagaWrapper, forkTopic),
    takeEvery(a.REMOVE_TOPIC, sagaWrapper, removeTopic),
    takeEvery(a.REMOVE_TOPIC_ID, sagaWrapper, removeTopicId),
    takeEvery(a.SIGNUP, sagaWrapper, signup),
    takeEvery(a.UPDATE, sagaWrapper, update),
    takeEvery(a.UPDATE_PASSWORD, sagaWrapper, updatePassword),
  ]);
};

const taskSagas = {
  addTopic,
  addTopicId,
  fetch,
  forkTopic,
  removeTopic,
  removeTopicId,
  signup,
  update,
  updatePassword,
};

export { taskSagas };
export default taskSaga;
