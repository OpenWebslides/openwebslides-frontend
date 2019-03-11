// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const refresh = function* (action: a.RefreshAction): Saga<void> {
  const { email } = action.payload;
  const userAuth: ?m.UserAuth = yield select(selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  yield put(actions.setUserAuthInState(null));
  yield call(putAndReturn, actions.apiPatchToken(email, userAuth.refreshToken));
};

export default refresh;
