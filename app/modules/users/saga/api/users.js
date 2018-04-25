// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import { setItemInState } from '../../actions';
import type { UserType } from '../../model';

export const apiGetUsersSaga = function* (action: t.ApiGetUsersAction): Generator<*, *, *> {
  try {
    const { id } = action.payload;
    const response = yield call(Api.get, id);

    const user: UserType = {
      id,
      email: response.body.data.attributes.email,
      firstName: response.body.data.attributes.firstName,
      lastName: response.body.data.attributes.lastName,
    };

    yield put(setItemInState(user));
  }
  catch (error) {
    // TODO
  }
};
