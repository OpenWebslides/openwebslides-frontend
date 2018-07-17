// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { call, put, select } from 'redux-saga/effects';

import authentication from 'modules/authentication';
import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';

const { setTokenInState } = authentication.actions;
const { getToken } = authentication.selectors;

export const apiPatchContentSaga = function* (
  action: t.ApiPatchTopicContentAction,
): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(t.API_PATCH_CONTENT));

  try {
    const { id, content } = action.payload;
    const token = yield select(getToken);

    const response = yield call(api.topics.patchContent, id, content, token);

    yield put(setTokenInState(response.token));
    yield put(apiRequestsStatus.actions.setSuccess(t.API_PATCH_CONTENT));
    yield put(flashMessage('editor:api.save.success'));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(t.API_PATCH_CONTENT, error));
    yield put(flashErrorMessage('editor:api.save.failure'));
  }
};
