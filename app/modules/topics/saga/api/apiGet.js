// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  const { id } = action.payload;
  const topicsResponseData: ApiResponseData = yield call(api.topics.get, id);
  if (topicsResponseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  const { attributes, relationships } = topicsResponseData.body.data;

  const topic: m.Topic = {
    id,
    title: attributes.title,
    description: attributes.description,
    rootContentItemId: attributes.rootContentItemId,
    upstreamTopicId: relationships.upstream.data ? relationships.upstream.data.id : null,
    forkedTopicIds: relationships.forks.data.map((item: { type: string, id: string }) => item.id),
    isContentFetched: false,
    isDirty: false,
  };

  yield put(actions.setMultipleInState([topic]));
};

export default apiGet;
