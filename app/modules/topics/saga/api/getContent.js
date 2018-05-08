// @flow

import { call, select } from 'redux-saga/effects';
import authentication from 'modules/authentication';

import { TopicsApi } from 'lib/api';

import * as t from '../../actionTypes';

const { getToken } = authentication.selectors;

export const apiGetTopicContentSaga = function* (
  action: t.ApiGetTopicContentAction,
): Generator<*, *, *> {
  try {
    const { topicId } = action.payload;
    const token = yield select(getToken);

    yield call(TopicsApi.getContent, topicId, token);
  }
  catch (error) {
    throw error;
  }
};
