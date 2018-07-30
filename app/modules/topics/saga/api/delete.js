// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import api from 'api';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

export const apiDeleteSaga = function* (action: a.ApiDeleteTopicAction): Saga<void> {
  try {
    const { id } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    yield call(api.topics.delete, id, userAuth.apiToken);
    yield put(actions.removeFromState(id));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
