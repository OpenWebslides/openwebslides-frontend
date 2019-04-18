// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiConnection';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiAccessTypesToAccessTypesMap = {
  public: m.accessTypes.PUBLIC,
  protected: m.accessTypes.PROTECTED,
  private: m.accessTypes.PRIVATE,
};

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  const { id } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  const accessToken = (userAuth != null) ? userAuth.accessToken : null;

  const topicsResponseData: ApiResponseData = yield call(api.topics.get, id, accessToken);
  if (topicsResponseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  const { attributes, relationships, meta } = topicsResponseData.body.data;

  const topic: m.Topic = {
    id,
    title: attributes.title,
    description: attributes.description,
    access: apiAccessTypesToAccessTypesMap[attributes.access],
    userId: relationships.user.data.id,
    rootContentItemId: attributes.rootContentItemId,
    hasOpenPullRequest: attributes.hasOpenPullRequest,
    timestamp: Number(meta.updatedAt) * 1000,
    upstreamTopicId: relationships.upstream.data ? relationships.upstream.data.id : null,
    forkedTopicIds: relationships.forks.data.map((item: { type: string, id: string }) => item.id),
    incomingPullRequestIds: relationships.incomingPullRequests.data.map(
      (item: { type: string, id: string }) => item.id,
    ),
    outgoingPullRequestIds: relationships.outgoingPullRequests.data.map(
      (item: { type: string, id: string }) => item.id,
    ),
    collaboratorUserIds: relationships.collaborators.data.map(
      (item: { type: string, id: string }) => item.id,
    ),
    isContentFetched: false,
    isDirty: false,
  };

  yield put(actions.setMultipleInState([topic]));
};

export { apiAccessTypesToAccessTypesMap };
export default apiGet;
