// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiConnection';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPullRequestStatesMap = {
  pending: m.pullRequestStates.PENDING,
  ready: m.pullRequestStates.READY,
  incompatible: m.pullRequestStates.INCOMPATIBLE,
  working: m.pullRequestStates.WORKING,
  accepted: m.pullRequestStates.ACCEPTED,
  rejected: m.pullRequestStates.REJECTED,
};

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  const { id } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  const pullRequestsResponseData: ApiResponseData = yield call(
    api.pullRequests.get, id, userAuth.accessToken,
  );
  if (pullRequestsResponseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  const { attributes, relationships, meta } = pullRequestsResponseData.body.data;

  const pullRequest: m.PullRequest = {
    id,
    message: attributes.message,
    feedback: attributes.feedback,
    sourceTopicId: relationships.source.data.id,
    targetTopicId: relationships.target.data.id,
    userId: relationships.user.data.id,
    state: apiPullRequestStatesMap[attributes.state],
    timestamp: Number(meta.createdAt) * 1000,
  };

  yield put(actions.setMultipleInState([pullRequest]));
};

export default apiGet;
