// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiDeleteToken`, (): void => {

  let dummyRefreshToken: string;

  beforeEach((): void => {
    dummyRefreshToken = 'dummyRefreshToken';
  });

  it(`selects the current user's refresh token from the state and executes a delete request to the token API endpoint`, (): void => {
    const dummyAction = actions.apiDeleteToken(dummyRefreshToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiDeleteToken, dummyAction)
      .provide([
        [call(api.token.delete, dummyRefreshToken), dummyApiResponse],
      ])
      .call(api.token.delete, dummyRefreshToken)
      .run();
  });

});
