// @flow

import { type Saga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const forkTopic = function* (action: a.ForkTopicAction): Saga<void> {
  const { id, topicId } = action.payload;

  const { id: forkedTopicId } = yield call(putAndReturn, topics.actions.fork(topicId));

  yield put(actions.addTopicId(id, forkedTopicId));
};

export default forkTopic;
