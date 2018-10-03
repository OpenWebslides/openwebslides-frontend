// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

// eslint-disable-next-line require-yield
const remove = function* (action: a.RemoveAction): Saga<void> {
  const { id } = action.payload;
  yield call(putAndReturn, actions.apiDelete(id));
  yield put(actions.removeFromState(id));
};

export default remove;
