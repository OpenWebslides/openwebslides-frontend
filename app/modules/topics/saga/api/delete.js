// @flow

import { call, put, select } from 'redux-saga/effects';
import authentication from 'modules/authentication';

import * as t from '../../actionTypes';
import Api from '../../api';
import { removeFromState } from '../../actions';

const { getToken } = authentication.selectors;

export const apiDeleteTopicSaga = function* (action: t.ApiDeleteTopicAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const token = yield select(getToken);

    yield call(Api.destroy, id, token);
    yield put(removeFromState(id));
  }
  catch (error) {
    // TODO
  }
};
