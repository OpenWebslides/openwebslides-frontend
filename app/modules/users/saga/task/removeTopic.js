// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const removeTopic = function* (action: a.RemoveTopicAction): Saga<void> {
  const { id, topicId } = action.payload;
  yield put(topics.actions.remove(topicId));
  yield put(actions.removeTopicId(id, topicId));
};

export default removeTopic;
