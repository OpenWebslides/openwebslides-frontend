// @flow

import { call, select } from 'redux-saga/effects';
import authentication from 'modules/authentication';

import { TopicsApi } from 'lib/api';

import * as t from '../../actionTypes';

const { getToken } = authentication.selectors;

export const apiPatchTopicContentSaga = function* (
  action: t.ApiPatchTopicContentAction,
): Generator<*, *, *> {
  try {
    const { id, contentItems } = action.payload;
    const token = yield select(getToken);

    yield call(TopicsApi.patchContent, id, contentItems, token);
  }
  catch (error) {
    // TODO
  }
};
