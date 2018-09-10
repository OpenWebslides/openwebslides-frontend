// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiDeleteToken`, (): void => {

  let dummyToken: string;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`selects the current user's token from the state and executes a delete request for this token to the token API endpoint`, (): void => {
    const dummyAction = actions.apiDeleteToken(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiDeleteToken, dummyAction)
      .provide([
        [call(api.token.delete, dummyToken), dummyApiResponse],
      ])
      .call(api.token.delete, dummyToken)
      .run();
  });

});
