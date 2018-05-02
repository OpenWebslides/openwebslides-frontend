// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import { setItemInState } from '../../actions';
import type { UserType } from '../../model';

export const apiGetUserSaga = function* (action: t.ApiGetUserAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const response = yield call(Api.get, id);
    const { attributes } = response.body.data;

    const user: UserType = {
      id,
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
    };

    yield put(setItemInState(user));
  }
  catch (error) {
    // TODO
  }
};
