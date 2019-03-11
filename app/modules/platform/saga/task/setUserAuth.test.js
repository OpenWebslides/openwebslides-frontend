// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`setUserAuth`, (): void => {

  let dummyRefreshToken: string;
  let dummyAccessToken: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyRefreshToken = 'dummyRefreshToken';
    dummyAccessToken = 'dummyAccessToken';
    dummyUserId = 'dummyUserId';
  });

  it(`puts a setUserAuthInState action`, (): void => {
    const dummyAction = actions.setUserAuth(dummyUserId, dummyRefreshToken, dummyAccessToken);

    return expectSaga(sagas.setUserAuth, dummyAction)
      .put(actions.setUserAuthInState({ userId: dummyUserId, refreshToken: dummyRefreshToken, accessToken: dummyAccessToken }))
      .run();
  });

});
