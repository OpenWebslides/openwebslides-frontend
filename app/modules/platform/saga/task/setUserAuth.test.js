// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`setUserAuth`, (): void => {

  let dummyApiToken: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyApiToken = 'foobarToken';
    dummyUserId = 'foobarUserId';
  });

  it(`puts a setUserAuthInState action`, (): void => {
    const dummyAction = actions.setUserAuth(dummyApiToken, dummyUserId);

    return expectSaga(sagas.setUserAuth, dummyAction)
      .put(actions.setUserAuthInState({ apiToken: dummyApiToken, userId: dummyUserId }))
      .run();
  });

});
