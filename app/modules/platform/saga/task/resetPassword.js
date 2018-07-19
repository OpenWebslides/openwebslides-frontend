// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as t from '../../actionTypes';

const resetPassword = function* (action: t.ResetPasswordAction): Generator<*, *, *> {
  const { email } = action.payload;
  yield put(actions.apiPostEmailToPassword(email));
};

export default resetPassword;
