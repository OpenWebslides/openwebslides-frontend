// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import users from 'modules/users';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const fork = function* (action: a.ForkAction): Saga<void> {
  // Fork the topic in the backend
  const { userId, topicId } = yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiPostFork(action.payload.id),
  );

  // Fetch the new topic from the backend
  yield call(putAndReturn, actions.fetch(topicId));

  // Add the topic to the user
  yield put(users.actions.addTopicId(userId, topicId));
};

export default fork;
