// @flow

import { call, put, select } from 'redux-saga/effects';
import { UsersApi } from 'lib/api';

import * as t from '../../actionTypes';

import { addToState } from '../../actions';

import { getToken } from '../../../authentication/selectors';

export const apiGetUserSaga = function* (action: t.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const token = yield select(getToken);

    const response = yield call(UsersApi.get, id, token);
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
