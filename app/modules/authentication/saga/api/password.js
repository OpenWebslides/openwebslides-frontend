// @flow

import { AuthenticationApi } from 'lib/api';

import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

export const apiPostPasswordSaga = function* (action: t.ApiPostPasswordAction): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(AuthenticationApi.reset, email);
  }
  catch (error) {
    // TODO
  }
};
