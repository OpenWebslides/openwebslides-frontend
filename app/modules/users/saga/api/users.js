// @flow

import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import authentication from 'modules/authentication';

import * as t from '../../actionTypes';
import { addToState } from '../../actions';

export const apiGetUserSaga = function* (action: t.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const token = yield select(authentication.selectors.getToken);

    const response = yield call(api.users.get, id, token);
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

export const apiPostUserSaga = function* (action: t.ApiPostUserAction): Generator<*, *, *> {
  try {
    const { email, firstName, lastName, password, tosAccepted } = action.payload;
    yield call(api.users.post, email, firstName, lastName, password, tosAccepted);
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
