// @flow

import { call } from 'redux-saga/effects';

import api from 'api';

import * as t from '../../actionTypes';

export const apiPostConfirmationSaga = function* (
  action: t.ApiPostConfirmationAction,
): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(api.confirmation.post, email);
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
