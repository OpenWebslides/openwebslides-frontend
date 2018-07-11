// @flow

import { ConfirmationApi } from 'lib/api';
import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

export const apiPostConfirmationSaga = function* (
  action: t.ApiPostConfirmationAction,
): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(ConfirmationApi.post, email);
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
