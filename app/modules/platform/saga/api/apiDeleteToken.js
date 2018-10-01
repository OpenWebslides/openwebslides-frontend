// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';

const apiDeleteToken = function* (
  action: a.ApiDeleteTokenAction,
): Saga<void> {
  const { token } = action.payload;
  yield call(api.token.delete, token);
};

export default apiDeleteToken;
