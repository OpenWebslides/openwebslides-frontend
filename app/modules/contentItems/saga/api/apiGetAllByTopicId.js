// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { UnexpectedHttpResponseError } from 'errors';
import api from 'api';
import { type ApiResponseData } from 'lib/ApiRequest';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGetAllByTopicId = function* (action: a.ApiGetAllByTopicIdAction): Saga<void> {
  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const { topicId } = action.payload;

    const responseData: ApiResponseData = yield call(api.topics.getContent, topicId);
    if (responseData.body == null) throw new UnexpectedHttpResponseError();
    const { attributes } = responseData.body.data;

    // TODO: validate response
    const contentItems: $ReadOnlyArray<m.ContentItem> = attributes.content;
    yield put(actions.setMultipleInState(contentItems));

    yield put(asyncRequests.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(asyncRequests.actions.setFailure(action.type, error));
  }
};

export default apiGetAllByTopicId;
