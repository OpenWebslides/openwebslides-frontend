// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const resetPassword = function* (action: a.ResetPasswordAction): Saga<void> {
  const { email } = action.payload;
  yield put(actions.apiPostEmailToPassword(email));
};

export default resetPassword;
