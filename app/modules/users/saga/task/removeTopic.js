// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const removeTopic = function* (action: a.RemoveTopicAction): Saga<void> {
  const { id, topicId } = action.payload;

  yield call(putAndReturn, topics.actions.remove(topicId));
  yield call(putAndReturn, actions.removeTopicId(id, topicId));
};

export default removeTopic;
