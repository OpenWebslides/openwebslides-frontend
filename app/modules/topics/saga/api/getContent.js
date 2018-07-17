// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { call, put, select } from 'redux-saga/effects';

import { Http5xxServerError } from 'errors';
import api from 'api';
import authentication from 'modules/authentication';
import contentItems from 'modules/contentItems';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';

const { setTokenInState } = authentication.actions;
const { getToken } = authentication.selectors;

export const apiGetContentSaga = function* (
  action: t.ApiGetTopicContentAction,
): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(t.API_GET_CONTENT));

  try {
    const { id } = action.payload;
    const token = yield select(getToken);

    const response = yield call(api.topics.getContent, id, token);

    // TODO: validate response
    const items: Array<contentItems.model.ContentItem> = response.body.data.attributes.content;
    yield put(contentItems.actions.setMultipleInState(items));

    yield put(setTokenInState(response.token));
    yield put(apiRequestsStatus.actions.setSuccess(t.API_GET_CONTENT));
    yield put(flashMessage('editor:api.load.success'));
  }
  catch (error) {
    if (!(error instanceof Http5xxServerError)) {
      throw error;
    }

    yield put(apiRequestsStatus.actions.setFailure(t.API_GET_CONTENT, error));
    yield put(flashErrorMessage('editor:api.load.failure'));
  }
};
