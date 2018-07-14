// @flow

import { call, put, select } from 'redux-saga/effects';

import authentication from 'modules/authentication';
import apis from 'apis';

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';

const { getToken } = authentication.selectors;

export const apiDeleteSaga = function* (action: t.ApiDeleteTopicAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const token = yield select(getToken);

    yield call(apis.topics.destroy, id, token);
    yield put(removeFromState(id));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
