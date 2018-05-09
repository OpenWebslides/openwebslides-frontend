// @flow

import { call, put } from 'redux-saga/effects';

import { UsersApi } from 'lib/api';

import * as t from '../../actionTypes';

import { addToState } from '../../actions';

export const apiGetUserSaga = function* (action: t.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const response = yield call(UsersApi.get, id);
    const { attributes } = response.body.data;

    yield put(addToState(
      id,
      attributes.firstName,
      attributes.lastName,
      attributes.email,
    ));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
