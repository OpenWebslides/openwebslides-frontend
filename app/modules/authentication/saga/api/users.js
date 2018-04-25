// @flow

import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';

export const apiPostUsersSaga = function* (action: t.ApiPostUsersAction): Generator<*, *, *> {
  try {
    const { email, firstName, lastName, password, tosAccepted } = action.payload;
    yield call(Api.signup, email, firstName, lastName, password, tosAccepted);
  }
  catch (error) {
    // TODO
  }
};
