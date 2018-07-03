// @flow

import { call, put, select } from 'redux-saga/effects';
import { flashMessage, flashErrorMessage } from 'redux-flash';

import ServerError from 'errors/api-errors/ServerError';

import authentication from 'modules/authentication';
import contentItems from 'modules/contentItems';

import { TopicsApi } from 'lib/api';
import api from 'modules/api';

import * as t from '../../actionTypes';

const { ContentItem } = contentItems.model;

const { setTokenInState } = authentication.actions;
const { getToken } = authentication.selectors;

const { setStatusInState } = api.actions;
const { statusTypes } = api.model;

export const apiGetContentSaga = function* (
  action: t.ApiGetTopicContentAction,
): Generator<*, *, *> {
  yield put(setStatusInState(t.API_GET_CONTENT, statusTypes.PENDING));

  try {
    const { id } = action.payload;
    const token = yield select(getToken);

    const response = yield call(TopicsApi.getContent, id, token);

    // TODO: validate response
    const items: Array<ContentItem> = response.body.data.attributes.content;
    yield put(contentItems.actions.setMultipleInState(items));

    yield put(setTokenInState(response.token));
    yield put(setStatusInState(t.API_GET_CONTENT, statusTypes.SUCCESS));
    yield put(flashMessage('editor:api.load.success'));
  }
  catch (error) {
    if (!(error instanceof ServerError)) {
      throw error;
    }

    yield put(setStatusInState(t.API_GET_CONTENT, statusTypes.FAILURE));
    yield put(flashErrorMessage('editor:api.load.failure'));
  }
};
