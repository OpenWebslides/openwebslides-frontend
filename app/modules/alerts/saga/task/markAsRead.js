// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const markAsReadSaga = function* (action: a.MarkAsReadAction): Saga<void> {
  const { id } = action.payload;

  // Mark alert as read
  yield call(putAndReturn, actions.apiPatch(id, true));

  // Refetch all alerts
  yield call(putAndReturn, actions.fetchAll());
};

export default markAsReadSaga;
