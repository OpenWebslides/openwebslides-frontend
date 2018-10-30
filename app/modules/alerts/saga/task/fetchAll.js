// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import { UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const fetchAllSaga = function* (action: a.FetchAllAction): Saga<void> {
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  yield call(putAndReturn, actions.apiGetAllByUserId(userAuth.userId));
};

export default fetchAllSaga;
