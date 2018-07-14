// @flow

import { call } from 'redux-saga/effects';

import apis from 'apis';

import * as t from '../../actionTypes';

export const apiPostPasswordSaga = function* (action: t.ApiPostPasswordAction): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(apis.password.post, email);
  }
  catch (error) {
    // TODO
  }
};
