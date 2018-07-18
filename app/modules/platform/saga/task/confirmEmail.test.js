// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`confirmEmail`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostConfirmation action`, (): void => {
    const dummyAction = actions.confirmEmail(dummyEmail);

    return expectSaga(sagas.confirmEmail, dummyAction)
      .put(actions.apiPostConfirmation(dummyEmail))
      .run();
  });

});
