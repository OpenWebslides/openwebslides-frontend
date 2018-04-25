// @flow

import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';

export const apiPostConfirmationSaga = function* (
  action: t.ApiPostConfirmationAction,
): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(Api.confirm, email);
  }
  catch (error) {
    // TODO
  }
};
