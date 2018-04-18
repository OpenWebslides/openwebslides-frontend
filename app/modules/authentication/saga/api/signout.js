// @flow

import { call, put, select } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { getToken } from '../../selectors';
import Api from '../../api';

const signout = function* (action: t.SignoutAction): Generator<*, *, *> {
  try {
    const token = yield select(getToken);

    yield call(Api.signout, token);

    yield put({ type: t.SIGNOUT_SUCCESS });
    yield put({ type: t.UPDATE_TOKEN, payload: { token: null } });
  }
  catch (error) {
    yield put({ type: t.SIGNOUT_FAILURE, error });
  }
};

export default signout;
