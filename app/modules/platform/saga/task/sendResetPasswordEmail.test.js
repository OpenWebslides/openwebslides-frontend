// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';

import actions from '../../actions';

import { sagas } from '..';

describe(`sendResetPasswordEmail`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostPassword action`, (): void => {
    const dummyAction = actions.sendResetPasswordEmail(dummyEmail);

    return expectSaga(sagas.sendResetPasswordEmail, dummyAction)
      .put(actions.apiPostPassword(dummyEmail))
      .dispatch({ type: 'apiRequestsStatus/SET_SUCCESS' })
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});
