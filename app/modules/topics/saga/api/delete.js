// @flow

import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import api from 'api';
import platform from 'modules/platform';

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';

export const apiDeleteSaga = function* (action: t.ApiDeleteTopicAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    yield call(api.topics.delete, id, userAuth.apiToken);
    yield put(removeFromState(id));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
