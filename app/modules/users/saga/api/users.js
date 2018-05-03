// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import { addToState } from '../../actions';

export const apiGetUserSaga = function* (action: t.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const response = yield call(Api.get, id);
    const { attributes } = response.body.data;

    yield put(addToState(
      id,
      attributes.firstName,
      attributes.lastName,
      attributes.email,
    ));
  }
  catch (error) {
    // TODO
  }
};
