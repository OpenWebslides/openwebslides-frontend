// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import * as t from '../../actionTypes';

export const apiPatchContentSaga = function* (
  action: t.ApiPatchTopicContentAction,
): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(t.API_PATCH_CONTENT));

  try {
    const { id, content } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    // const response =
    yield call(api.topics.patchContent, id, content, userAuth.apiToken);

    // #TODO what's the point of this? @Florian
    // yield put(setTokenInState(response.token));
    yield put(apiRequestsStatus.actions.setSuccess(t.API_PATCH_CONTENT));
    yield put(flashMessage('editor:api.save.success'));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(t.API_PATCH_CONTENT, error));
    yield put(flashErrorMessage('editor:api.save.failure'));
  }
};
