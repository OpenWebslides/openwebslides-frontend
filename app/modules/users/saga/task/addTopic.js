// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const addTopic = function* (action: a.AddTopicAction): Saga<void> {
  const { id, title, description } = action.payload;

  const { id: topicId } = yield call(putAndReturn, topics.actions.create(title, description, id));
  yield put(actions.addTopicId(id, topicId));
};

export default addTopic;
