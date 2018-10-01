// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';

const apiPatchPassword = function* (
  action: a.ApiPatchPasswordAction,
): Saga<void> {
  const { password, resetPasswordToken } = action.payload;
  yield call(api.password.patch, password, resetPasswordToken);
};

export default apiPatchPassword;
