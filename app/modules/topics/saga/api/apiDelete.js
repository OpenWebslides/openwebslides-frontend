// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';

import * as a from '../../actionTypes';

const apiDelete = function* (action: a.ApiDeleteAction): Saga<void> {
  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const { id } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    yield call(api.topics.delete, id, userAuth.apiToken);
    yield put(asyncRequests.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(asyncRequests.actions.setFailure(action.type, error));
  }
};

export default apiDelete;
