// @flow

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';

import actions from '../../actions';
import * as a from '../../actionTypes';

const resetPassword = function* (action: a.ResetPasswordAction): Saga<void> {
  const { password, resetPasswordToken } = action.payload;
  yield put(actions.apiPatchPassword(password, resetPasswordToken));

  // Wait for api request to complete #TODO use unique request identifiers for this
  yield take('apiRequestsStatus/SET_SUCCESS');
  // Then redirect
  yield put(push(paths.AUTH_SIGNIN_ROUTE));
};

export default resetPassword;
