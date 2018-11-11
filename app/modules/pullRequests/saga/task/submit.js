// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const submit = function* (action: a.SubmitAction): Saga<{ id: string }> {
  const { message, sourceTopicId, targetTopicId, userId } = action.payload;

  // Create the new pull request in the backend.
  const { id } = yield call(putAndReturn, actions.apiPost(
    message, sourceTopicId, targetTopicId, userId,
  ));
  // Fetch the new topic from the backend so the state is up-to-date,
  // and wait for request completion.
  yield call(putAndReturn, actions.fetch(id));

  // Return the pull request id.
  return { id };
};

export default submit;
