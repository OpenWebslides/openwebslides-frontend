// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as t from '../../actionTypes';

const signin = function* (action: t.SigninAction): Generator<*, *, *> {
  const { email, password } = action.payload;
  yield put(actions.apiPostSigninAndGetUserAuth(email, password));
};

export default signin;
