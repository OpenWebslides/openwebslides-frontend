// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';

const apiPostPassword = function* (
  action: a.ApiPostPasswordAction,
): Saga<void> {
  const { email } = action.payload;
  yield call(api.password.post, email);
};

export default apiPostPassword;
