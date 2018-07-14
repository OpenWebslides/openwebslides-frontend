// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { call, put, select } from 'redux-saga/effects';

import authentication from 'modules/authentication';
import apis from 'apis';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';

const { setTokenInState } = authentication.actions;
const { getToken } = authentication.selectors;

const { setStatusInState } = apiRequestsStatus.actions;
const { statusTypes } = apiRequestsStatus.model;

export const apiPatchContentSaga = function* (
  action: t.ApiPatchTopicContentAction,
): Generator<*, *, *> {
  yield put(setStatusInState(t.API_PATCH_CONTENT, statusTypes.PENDING));

  try {
    const { id, content } = action.payload;
    const token = yield select(getToken);

    const response = yield call(apis.topics.patchContent, id, content, token);

    yield put(setTokenInState(response.token));
    yield put(setStatusInState(t.API_PATCH_CONTENT, statusTypes.SUCCESS));
    yield put(flashMessage('editor:api.save.success'));
  }
  catch (error) {
    yield put(setStatusInState(t.API_PATCH_CONTENT, statusTypes.FAILURE));
    yield put(flashErrorMessage('editor:api.save.failure'));
  }
};
