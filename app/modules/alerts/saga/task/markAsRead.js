// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const markAsReadSaga = function* (action: a.MarkAsReadAction): Saga<void> {
  const { id } = action.payload;

  yield call(putAndReturn, actions.apiPatch(id, true));
};

export default markAsReadSaga;
