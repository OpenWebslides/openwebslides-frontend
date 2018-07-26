// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const resendConfirmationEmail = function* (
  action: a.ResendConfirmationEmailAction,
): Saga<void> {
  const { email } = action.payload;
  yield put(actions.apiPostEmailToConfirmation(email));
};

export default resendConfirmationEmail;
