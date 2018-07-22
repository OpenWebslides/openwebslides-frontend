// @flow

import { call, put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';
import api from 'api';
import platform from 'modules/platform';

import * as a from '../../actionTypes';
import { addToState } from '../../actions';

export const apiGetUserSaga = function* (action: a.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    const response = yield call(api.users.get, id, userAuth.apiToken);
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

export const apiPostUserSaga = function* (action: a.ApiPostUserAction): Generator<*, *, *> {
  try {
    const { email, firstName, lastName, password, tosAccepted } = action.payload;
    yield call(api.users.post, email, firstName, lastName, password, tosAccepted);
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
