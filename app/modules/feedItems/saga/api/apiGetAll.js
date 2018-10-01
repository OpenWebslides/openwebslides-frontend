// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

// TODO: change this to topic once backend is deployed
const apiEventTypesToFeedItemTypesMap = {
  topic_created: m.feedItemTypes.CREATE,
  topic_updated: m.feedItemTypes.UPDATE,
};

const apiGetAll = function* (action: a.ApiGetAllAction): Saga<void> {
  const responseData: ApiResponseData = yield call(api.feedItems.getAll);
  if (responseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  // eslint-disable-next-line flowtype/no-weak-types
  const data = responseData.body.data.map((item: Object): m.FeedItem => {
    return {
      id: item.id,
      userId: item.relationships.user.data.id,
      topicId: item.relationships.topic.data.id,
      type: apiEventTypesToFeedItemTypesMap[item.attributes.eventType],
      timestamp: Number(item.meta.createdAt) * 1000,
    };
  });
  yield put(actions.setMultipleInState(data));
};

export { apiEventTypesToFeedItemTypesMap };
export default apiGetAll;
