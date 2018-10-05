// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import users from 'modules/users';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fork = function* (action: a.ForkAction): Saga<void> {
  // Fork the topic in the backend
  const { userId, topicId } = yield yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiPostFork(action.payload.id),
  );

  // Add the topic to the user
  yield put(users.actions.addTopicId(userId, topicId));
};

export default fork;
