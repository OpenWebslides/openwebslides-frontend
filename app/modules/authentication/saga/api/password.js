// @flow

import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';

export const apiPostPasswordSaga = function* (action: t.ApiPostPasswordAction): Generator<*, *, *> {
  try {
    const { email } = action.payload;
    yield call(Api.reset, email);
  }
  catch (error) {
    // TODO
  }
};
