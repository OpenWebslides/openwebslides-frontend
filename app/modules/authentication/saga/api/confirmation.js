// @flow

import { AuthenticationApi } from 'lib/api';

import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

export const apiPostConfirmationSaga = function* (
  action: t.ApiPostConfirmationAction,
): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(AuthenticationApi.confirm, email);
  }
  catch (error) {
    // TODO
  }
};
