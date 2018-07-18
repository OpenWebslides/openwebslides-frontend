// @flow

import { call, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import api from 'api';
import platform from 'modules/platform';

import * as t from '../../actionTypes';

export const apiPostSaga = function* (action: t.ApiPostTopicAction): Generator<*, *, *> {
  try {
    const { userId, title, description } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    // TODO: add rootContentItemId later
    yield call(api.topics.post, userId, title, description, userAuth.apiToken);
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
