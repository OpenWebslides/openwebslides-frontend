// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const resendConfirmationEmail = function* (
  action: a.ResendConfirmationEmailAction,
): Generator<*, *, *> {
  const { email } = action.payload;
  yield put(actions.apiPostEmailToConfirmation(email));
};

export default resendConfirmationEmail;
