// @flow

import { call } from 'redux-saga/effects';

import apis from 'apis';

import * as t from '../../actionTypes';

export const apiPostUsersSaga = function* (action: t.ApiPostUsersAction): Generator<*, *, *> {
  try {
    const { email, firstName, lastName, password, tosAccepted } = action.payload;
    yield call(apis.users.post, email, firstName, lastName, password, tosAccepted);
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
