// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { call, put, select } from 'redux-saga/effects';

import { Http5xxServerError } from 'errors';
import apis from 'apis';
import authentication from 'modules/authentication';
import contentItems from 'modules/contentItems';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';

const { setTokenInState } = authentication.actions;
const { getToken } = authentication.selectors;

const { setStatusInState } = apiRequestsStatus.actions;
const { statusTypes } = apiRequestsStatus.model;

export const apiGetContentSaga = function* (
  action: t.ApiGetTopicContentAction,
): Generator<*, *, *> {
  yield put(setStatusInState(t.API_GET_CONTENT, statusTypes.PENDING));

  try {
    const { id } = action.payload;
    const token = yield select(getToken);

    const response = yield call(apis.topics.getContent, id, token);

    // TODO: validate response
    const items: Array<contentItems.model.ContentItem> = response.body.data.attributes.content;
    yield put(contentItems.actions.setMultipleInState(items));

    yield put(setTokenInState(response.token));
    yield put(setStatusInState(t.API_GET_CONTENT, statusTypes.SUCCESS));
    yield put(flashMessage('editor:api.load.success'));
  }
  catch (error) {
    if (!(error instanceof Http5xxServerError)) {
      throw error;
    }

    yield put(setStatusInState(t.API_GET_CONTENT, statusTypes.FAILURE));
    yield put(flashErrorMessage('editor:api.load.failure'));
  }
};
