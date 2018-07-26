// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const signin = function* (action: a.SigninAction): Saga<void> {
  const { email, password } = action.payload;
  yield put(actions.apiPostSigninToTokenAndGetUserAuth(email, password));
};

export default signin;
