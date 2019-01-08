// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const accept = function* (action: a.AcceptAction): Saga<void> {
  const { id, feedback } = action.payload;

  // Accept the new pull request in the backend.
  yield call(putAndReturn, actions.apiPatch(
    id, 'accept', feedback,
  ));
  // Fetch the pull request from the backend so the state is up-to-date
  yield call(putAndReturn, actions.fetch(id));
};

export default accept;
