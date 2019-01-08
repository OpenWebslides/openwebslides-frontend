// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const reject = function* (action: a.RejectAction): Saga<void> {
  const { id, feedback } = action.payload;

  // Reject the new pull request in the backend.
  yield call(putAndReturn, actions.apiPatch(
    id, 'reject', feedback,
  ));
  // Fetch the pull request from the backend so the state is up-to-date
  yield call(putAndReturn, actions.fetch(id));
};

export default reject;
