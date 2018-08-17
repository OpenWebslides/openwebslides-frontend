// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';
import * as m from '../../model';
import { setEventsInState } from '../../actions';

// TODO: change this to topic once backend is deployed
const mapEventTypeToPredicateType = {
  topic_created: m.feedItemTypes.CREATE,
  topic_updated: m.feedItemTypes.UPDATE,
};

export const apiGetNotificationsSaga = function* (action: a.FetchAction): Saga<void> {
  try {
    const response = yield call(api.notifications.getAll);

    // eslint-disable-next-line flowtype/no-weak-types
    const data = response.body.data.map((item: Object): m.FeedItem => {
      return {
        id: item.id,
        userId: item.relationships.user.data.id,
        topicId: item.relationships.topic.data.id,
        type: mapEventTypeToPredicateType[item.attributes.eventType],
        timestamp: Number(item.meta.createdAt) * 1000,
      };
    });

    yield put(setEventsInState(data));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
