// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import { predicateTypes } from '../../model';
import type { FeedItemType } from '../../model';

// TODO: change this to topic once backend is deployed
const mapEventTypeToPredicateType = {
  deck_created: predicateTypes.CREATE,
  deck_updated: predicateTypes.UPDATE,
};

const fetchSaga = function* (action: t.FetchAction): Generator<*, *, *> {
  try {
    const response = yield call(Api.fetch);

    const data = response.data.map((item: {}): Array<FeedItemType> => {
      return {
        id: item.id,
        userId: item.relationships.user.data.id,
        // TODO: change this to topic once backend is deployed
        topicId: item.relationships.deck.data.id,
        predicate: mapEventTypeToPredicateType[item.attributes.eventType],
        timestamp: Number(item.meta.createdAt) * 1000,
      };
    });

    yield put({ type: t.FETCH_FEED_SUCCESS, data });
  }
  catch (error) {
    yield put({ type: t.FETCH_FEED_FAILURE, error });
  }
};

export default fetchSaga;
