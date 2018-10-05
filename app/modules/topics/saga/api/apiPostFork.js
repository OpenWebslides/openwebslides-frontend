// @flow

import { type Saga } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPostFork = function* (action: a.ApiPostForkAction): Saga<void> {
  const { id } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  const topicsResponseData: ApiResponseData = yield call(
    api.topics.postFork, id, userAuth.apiToken,
  );

  if (topicsResponseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  const { attributes, relationships, id: forkedId } = topicsResponseData.body.data;

  const topic: m.Topic = {
    id: forkedId,
    title: attributes.title,
    description: attributes.description,
    rootContentItemId: attributes.rootContentItemId,
    // Upstream topic id is id of request
    upstreamTopicId: id,
    // Forks will always be empty, because forking a fork is not allowed
    forkedTopicIds: [],
    isContentFetched: false,
  };

  yield put(actions.setMultipleInState([topic]));
};

export default apiPostFork;
