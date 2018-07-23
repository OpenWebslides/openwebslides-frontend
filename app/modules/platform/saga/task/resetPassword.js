// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const resetPassword = function* (action: a.ResetPasswordAction): Generator<*, *, *> {
  const { email } = action.payload;
  yield put(actions.apiPostEmailToPassword(email));
};

export default resetPassword;
