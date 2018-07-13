// @flow

import { call } from 'redux-saga/effects';

import { PasswordApi } from 'lib/api';

import * as t from '../../actionTypes';

export const apiPostPasswordSaga = function* (action: t.ApiPostPasswordAction): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(PasswordApi.post, email);
  }
  catch (error) {
    // TODO
  }
};
