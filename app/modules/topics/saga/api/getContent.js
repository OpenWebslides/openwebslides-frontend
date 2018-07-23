// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError, Http5xxServerError } from 'errors';
import api from 'api';
import contentItems from 'modules/contentItems';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import * as a from '../../actionTypes';

export const apiGetContentSaga = function* (
  action: a.ApiGetTopicContentAction,
): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(a.API_GET_CONTENT));

  try {
    const { id } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    const response = yield call(api.topics.getContent, id, userAuth.apiToken);

    // TODO: validate response
    const items: Array<contentItems.model.ContentItem> = response.body.data.attributes.content;
    yield put(contentItems.actions.setMultipleInState(items));

    // #TODO what's the point of this? @Florian
    // yield put(setTokenInState(response.token));
    yield put(apiRequestsStatus.actions.setSuccess(a.API_GET_CONTENT));
    yield put(flashMessage('editor:api.load.success'));
  }
  catch (error) {
    if (!(error instanceof Http5xxServerError)) {
      throw error;
    }

    yield put(apiRequestsStatus.actions.setFailure(a.API_GET_CONTENT, error));
    yield put(flashErrorMessage('editor:api.load.failure'));
  }
};
