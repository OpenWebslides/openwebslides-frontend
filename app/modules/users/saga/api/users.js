// @flow

import { call, put, select } from 'redux-saga/effects';

import apis from 'apis';
import authentication from 'modules/authentication';

import * as t from '../../actionTypes';
import { addToState } from '../../actions';

export const apiGetUserSaga = function* (action: t.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const token = yield select(authentication.selectors.getToken);

    const response = yield call(apis.users.get, id, token);
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
