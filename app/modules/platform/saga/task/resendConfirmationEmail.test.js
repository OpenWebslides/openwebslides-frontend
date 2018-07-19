// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`resendConfirmationEmail`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostConfirmation action`, (): void => {
    const dummyAction = actions.resendConfirmationEmail(dummyEmail);

    return expectSaga(sagas.resendConfirmationEmail, dummyAction)
      .put(actions.apiPostEmailToConfirmation(dummyEmail))
      .run();
  });

});
