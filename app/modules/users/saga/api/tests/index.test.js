// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apiSaga from '..';

import { apiGetUsersSaga } from '../users';

import * as t from '../../../actionTypes';

describe(`apiSaga`, (): void => {
  it(`takes every API_GET_USERS action and forks apiGetUsersSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(t.API_GET_USERS, apiGetUsersSaga)
      .silentRun();
  });
});
