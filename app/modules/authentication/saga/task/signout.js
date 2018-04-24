// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiDeleteToken } from '../../actions';

const signoutSaga = function* (action: t.SignoutAction): Generator<*, *, *> {
  yield put(apiDeleteToken());
};

export default signoutSaga;
