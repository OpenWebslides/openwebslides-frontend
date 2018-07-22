// @flow

import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import * as t from '../../actionTypes';

export const apiPostSaga = function* (action: t.ApiPostTopicAction): Generator<*, *, *> {
  const { userId, title, description } = action.payload;
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    // TODO: add rootContentItemId later
    yield call(api.topics.post, userId, title, description, userAuth.apiToken);

    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};
