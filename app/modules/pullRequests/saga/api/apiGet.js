// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPullRequestStatesMap = {
  open: m.pullRequestStates.OPEN,
  accepted: m.pullRequestStates.ACCEPTED,
  rejected: m.pullRequestStates.REJECTED,
};

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  const { id } = action.payload;
  const pullRequestsResponseData: ApiResponseData = yield call(api.pullRequests.get, id);
  if (pullRequestsResponseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  const { attributes, relationships, meta } = pullRequestsResponseData.body.data;

  const pullRequest: m.PullRequest = {
    id,
    message: attributes.message,
    sourceTopicId: relationships.source.data.id,
    targetTopicId: relationships.target.data.id,
    userId: relationships.user.data.id,
    state: apiPullRequestStatesMap[attributes.state],
    timestamp: Number(meta.createdAt) * 1000,
  };

  yield put(actions.setMultipleInState([pullRequest]));
};

export default apiGet;
