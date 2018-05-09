// @flow

import { UsersApi } from 'lib/api';

import { call } from 'redux-saga/effects';

import * as t from '../../actionTypes';

export const apiPostUsersSaga = function* (action: t.ApiPostUsersAction): Generator<*, *, *> {
  try {
    const { email, firstName, lastName, password, tosAccepted } = action.payload;
    yield call(UsersApi.post, email, firstName, lastName, password, tosAccepted);
  }
  catch (error) {
    // TODO
  }
};
