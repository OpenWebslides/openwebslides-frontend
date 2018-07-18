// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`signin`, (): void => {

  let dummyEmail: string;
  let dummyPassword: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';
  });

  it(`puts an apiPostSigninAndGetAuth action`, (): void => {
    const dummyAction = actions.signin(dummyEmail, dummyPassword);

    return expectSaga(sagas.signin, dummyAction)
      .put(actions.apiPostSigninAndGetUserAuth(dummyEmail, dummyPassword))
      .run();
  });

});
