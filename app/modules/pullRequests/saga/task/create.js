// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const create = function* (action: a.CreateAction): Saga<{ id: string }> {
  const { message, sourceTopicId, targetTopicId, userId } = action.payload;

  // Create the new pull request in the backend.
  const { id } = yield call(putAndReturn, actions.apiPost(
    message, sourceTopicId, targetTopicId, userId,
  ));
  // Fetch the new pull request from the backend so the state is up-to-date,
  // and wait for request completion.
  yield call(putAndReturn, actions.fetch(id));
  // Refetch the source and target topics from the backend so the state is up-to-date,
  // and wait for request completion.
  yield call(putAndReturn, topics.actions.fetch(sourceTopicId));
  yield call(putAndReturn, topics.actions.fetch(targetTopicId));

  // Return the pull request id.
  return { id };
};

export default create;
