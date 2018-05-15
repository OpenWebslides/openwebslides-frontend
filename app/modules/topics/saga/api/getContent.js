// @flow

import { call, put, select } from 'redux-saga/effects';
import { flashMessage, flashErrorMessage } from 'redux-flash';

import ServerError from 'errors/ServerError';

import authentication from 'modules/authentication';
import contentItems from 'modules/content-items';

import { TopicsApi } from 'lib/api';
import api from 'modules/api';

import * as t from '../../actionTypes';

const { setTokenInState } = authentication.actions;
const { getToken } = authentication.selectors;

const { setStatusInState } = api.actions;
const { statusTypes } = api.model;

const { setMultipleInState } = contentItems.actions;
const { ContentItem } = contentItems.model;

export const apiGetTopicContentSaga = function* (
  action: t.ApiGetTopicContentAction,
): Generator<*, *, *> {
  yield put(setStatusInState(t.API_GET_TOPIC_CONTENT, statusTypes.PENDING));

  try {
    const { topicId } = action.payload;
    const token = yield select(getToken);

    const response = yield call(TopicsApi.getContent, topicId, token);

    // TODO: validate response
    const items: Array<ContentItem> = response.body.data.attributes.content;
    yield put(setMultipleInState(items));

    yield put(setTokenInState(response.token));
    yield put(setStatusInState(t.API_GET_TOPIC_CONTENT, statusTypes.SUCCESS));
    yield put(flashMessage('editor:api.load.success'));
  }
  catch (error) {
    if (!(error instanceof ServerError)) {
      throw error;
    }

    yield put(setStatusInState(t.API_GET_TOPIC_CONTENT, statusTypes.FAILURE));
    yield put(flashErrorMessage('editor:api.load.failure'));
  }
};
