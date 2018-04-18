// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';

const signout = function* (action: t.SignoutAction): Generator<*, *, *> {
  try {
    yield call(Api.signout);

    yield put({ type: t.SIGNOUT_SUCCESS });
    yield put({ type: t.UPDATE_TOKEN, payload: { token: null } });
  }
  catch (error) {
    yield put({ type: t.SIGNOUT_FAILURE, error });
  }
};

export default signout;
