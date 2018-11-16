// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const markAsReadSaga = function* (action: a.MarkAsReadAction): Saga<void> {
  const { id } = action.payload;

  // Mark alert as read in the backend
  yield call(putAndReturn, actions.apiPatch(id, true));

  // Mark alert as read in state
  yield put(actions.markAsReadInState(id));
};

export default markAsReadSaga;
