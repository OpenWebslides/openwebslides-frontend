// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const sendResetPasswordEmail = function* (
  action: a.SendResetPasswordEmailAction,
): Saga<void> {
  const { email } = action.payload;
  yield put(actions.apiPostPassword(email));
};

export default sendResetPasswordEmail;
