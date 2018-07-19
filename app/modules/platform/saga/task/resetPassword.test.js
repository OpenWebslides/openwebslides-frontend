// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`resetPassword`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostPassword action`, (): void => {
    const dummyAction = actions.resetPassword(dummyEmail);

    return expectSaga(sagas.resetPassword, dummyAction)
      .put(actions.apiPostPassword(dummyEmail))
      .run();
  });

});
