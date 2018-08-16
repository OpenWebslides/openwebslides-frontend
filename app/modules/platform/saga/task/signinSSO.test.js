// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`signinSSO`, (): void => {

  let dummyApiToken: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyApiToken = 'foobarToken';
    dummyUserId = 'foobarUserId';
  });

  it(`puts a fetch and a setUserAuthInState action`, (): void => {
    const dummyAction = actions.signinSSO(dummyApiToken, dummyUserId);

    return expectSaga(sagas.signinSSO, dummyAction)
      .put(actions.setUserAuthInState({ apiToken: dummyApiToken, userId: dummyUserId }))
      .run();
  });

});
