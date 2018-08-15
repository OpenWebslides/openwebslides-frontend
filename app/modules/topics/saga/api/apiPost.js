// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import * as a from '../../actionTypes';

const apiPost = function* (action: a.ApiPostAction): Saga<void> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { userId, title, description } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    const responseData: ApiResponseData = yield call(
      api.topics.post, title, description, userId, userAuth.apiToken,
    );
    if (responseData.body == null) throw new UnexpectedHttpResponseError();

    yield put(apiRequestsStatus.actions.setSuccess(action.type, { id: responseData.body.data.id }));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiPost;
