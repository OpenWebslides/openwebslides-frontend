// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import { predicateTypes } from '../../model';
import type { FeedItemType } from '../../model';

import { setFeedItemsInState } from '../../actions';

// TODO: change this to topic once backend is deployed
const mapEventTypeToPredicateType = {
  topic_created: predicateTypes.CREATE,
  topic_updated: predicateTypes.UPDATE,
};

export const apiGetNotificationsSaga = function* (action: t.FetchAction): Generator<*, *, *> {
  try {
    const response = yield call(Api.fetch);

    // eslint-disable-next-line flowtype/no-weak-types
    const data = response.body.data.map((item: Object): FeedItemType => {
      return {
        id: item.id,
        userId: item.relationships.user.data.id,
        topicId: item.relationships.topic.data.id,
        predicate: mapEventTypeToPredicateType[item.attributes.eventType],
        timestamp: Number(item.meta.createdAt) * 1000,
      };
    });

    yield put(setFeedItemsInState(data));
  }
  catch (error) {
    // TODO
  }
};