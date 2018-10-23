// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const submit = function* (action: a.SubmitAction): Saga<{ id: string }> {
  const { message, topicId, userId } = action.payload;

  // Create the new pull request in the backend.
  const { id } = yield call(putAndReturn, actions.apiPost(
    message, topicId, userId,
  ));

  // Return the pull request id.
  return { id };
};

export default submit;
