// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';

import actions from '../../actions';

import { sagas } from '..';

describe(`resendConfirmationEmail`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostConfirmation action and redirects to signin on successful request`, (): void => {
    const dummyAction = actions.resendConfirmationEmail(dummyEmail);

    return expectSaga(sagas.resendConfirmationEmail, dummyAction)
      .put(actions.apiPostConfirmation(dummyEmail))
      .dispatch({ type: 'apiRequestsStatus/SET_SUCCESS' })
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});
