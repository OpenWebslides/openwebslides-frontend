// @flow

import { call, put } from 'redux-saga/effects';

import { FETCH_FEED_SUCCESS, FETCH_FEED_FAILURE } from './actionTypes';
import Api from './api';
import { predicateTypes } from './model';

// TODO: change this to topic once backend is deployed
const mapEventTypeToPredicateType = {
  'deck_created': predicateTypes.CREATE,
  'deck_updated': predicateTypes.UPDATE,
};

const fetch = function* (): Generator<*, *, *> {
  try {
    const response = yield call(Api.fetch);

    const data = response.data.map((item) => {
      return {
        id: item.id,
        userId: item.relationships.user.data.id,
        // TODO: change this to topic once backend is deployed
        topicId: item.relationships.deck.data.id,
        predicate: mapEventTypeToPredicateType[item.attributes.eventType],
        timestamp: parseInt(item.meta.createdAt) * 1000,
      };
    });

    yield put({ type: FETCH_FEED_SUCCESS, data });
  }
  catch (error) {
    yield put({ type: FETCH_FEED_FAILURE, error });
  }
};

export {
  fetch,
};
