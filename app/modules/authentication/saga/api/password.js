// @flow

import { call } from 'redux-saga/effects';

import api from 'api';

import * as t from '../../actionTypes';

export const apiPostPasswordSaga = function* (action: t.ApiPostPasswordAction): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(api.password.post, email);
  }
  catch (error) {
    // TODO
  }
};
