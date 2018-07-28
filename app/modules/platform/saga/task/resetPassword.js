// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const resetPassword = function* (action: a.ResetPasswordAction): Saga<void> {
  const { password, resetPasswordToken } = action.payload;
  yield put(actions.apiPatchPassword(password, resetPasswordToken));
};

export default resetPassword;
